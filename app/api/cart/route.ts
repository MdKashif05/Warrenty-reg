import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

async function getOrCreateCart(customerId?: string | null, sessionId?: string | null) {
  if (customerId) {
    return db.cart.upsert({
      where: { customerId },
      create: { customerId },
      update: {},
      include: { items: { include: { product: true, productVariant: true } } },
    });
  }
  if (sessionId) {
    return db.cart.upsert({
      where: { sessionId },
      create: { sessionId },
      update: {},
      include: { items: { include: { product: true, productVariant: true } } },
    });
  }
  return null;
}

// GET /api/cart — get current cart
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("customer_token")?.value;
    let customerId: string | null = null;

    if (token) {
      const { verifyCustomerToken } = await import("@/lib/auth-customer");
      const payload = verifyCustomerToken(token);
      customerId = payload?.id || null;
    }

    const sessionId = cookieStore.get("cart_session")?.value || null;
    const cart = await getOrCreateCart(customerId, sessionId);

    if (!cart) {
      return NextResponse.json({ items: [], total: 0 });
    }

    const items = cart.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      variantId: item.variantId,
      qty: item.qty,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        imagePath: item.product.imagePath,
      },
      variant: item.productVariant
        ? {
            id: item.productVariant.id,
            name: item.productVariant.name,
            price: item.productVariant.price,
            mrp: item.productVariant.mrp,
          }
        : null,
    }));

    const total = items.reduce(
      (sum, item) => sum + (item.variant?.price ?? 0) * item.qty,
      0
    );

    return NextResponse.json({ items, total, cartId: cart.id });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ items: [], total: 0 });
  }
}

// POST /api/cart — add or update item
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, variantId, qty = 1 } = body;

    if (!productId) {
      return NextResponse.json({ error: "productId required" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("customer_token")?.value;
    let customerId: string | null = null;

    if (token) {
      const { verifyCustomerToken } = await import("@/lib/auth-customer");
      const payload = verifyCustomerToken(token);
      customerId = payload?.id || null;
    }

    let sessionId = cookieStore.get("cart_session")?.value || null;
    if (!sessionId && !customerId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    }

    // Get or create cart
    let cart;
    if (customerId) {
      cart = await db.cart.upsert({
        where: { customerId },
        create: { customerId },
        update: {},
      });
    } else {
      cart = await db.cart.upsert({
        where: { sessionId: sessionId! },
        create: { sessionId: sessionId! },
        update: {},
      });
    }

    // Upsert cart item
    if (qty <= 0) {
      // Remove item
      await db.cartItem.deleteMany({
        where: { cartId: cart.id, productId, variantId: variantId || null },
      });
    } else {
      await db.cartItem.upsert({
        where: {
          cartId_productId_variantId: {
            cartId: cart.id,
            productId,
            variantId: variantId || null,
          },
        },
        create: { cartId: cart.id, productId, variantId: variantId || null, qty },
        update: { qty },
      });
    }

    const response = NextResponse.json({ success: true });
    if (sessionId && !cookieStore.get("cart_session")?.value) {
      response.cookies.set("cart_session", sessionId, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }
    return response;
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

// DELETE /api/cart — clear cart
export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("customer_token")?.value;
    let customerId: string | null = null;

    if (token) {
      const { verifyCustomerToken } = await import("@/lib/auth-customer");
      const payload = verifyCustomerToken(token);
      customerId = payload?.id || null;
    }

    const sessionId = cookieStore.get("cart_session")?.value || null;

    if (customerId) {
      const cart = await db.cart.findUnique({ where: { customerId } });
      if (cart) await db.cartItem.deleteMany({ where: { cartId: cart.id } });
    } else if (sessionId) {
      const cart = await db.cart.findUnique({ where: { sessionId } });
      if (cart) await db.cartItem.deleteMany({ where: { cartId: cart.id } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
