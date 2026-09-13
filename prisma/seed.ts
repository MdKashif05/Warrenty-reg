import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env["DIRECT_URL"] || process.env["DATABASE_URL"] || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Thermal Lexum database...\n");

  // ─── Products ───────────────────────────────────────────────────────────────
  const products = [
    {
      name: "LX-TIM Pro",
      slug: "lx-tim-pro",
      category: "THERMAL_PASTE" as const,
      shortDescription: "17.6 W/mK ultra-high conductivity thermal compound",
      description: "Premium thermal paste engineered for extreme cooling performance. Ideal for CPUs, GPUs, and overclocking rigs.",
      warrantyMonths: 12,
      status: "ACTIVE" as const,
      sortOrder: 1,
      isSellable: true,
    },
    {
      name: "LX-TIM Standard",
      slug: "lx-tim-standard",
      category: "THERMAL_PASTE" as const,
      shortDescription: "Reliable everyday thermal paste",
      description: "High-quality thermal compound for desktop builds and laptop repastes. Excellent value with great performance.",
      warrantyMonths: 12,
      status: "ACTIVE" as const,
      sortOrder: 2,
      isSellable: true,
    },
    {
      name: "LX-LM Pro",
      slug: "lx-lm-pro",
      category: "LIQUID_METAL" as const,
      shortDescription: "73 W/mK gallium-alloy liquid metal",
      description: "Professional-grade liquid metal thermal interface for delidded CPUs and extreme overclockers.",
      warrantyMonths: 12,
      status: "ACTIVE" as const,
      sortOrder: 3,
      isSellable: true,
    },
    {
      name: "LX-PAD Standard",
      slug: "lx-pad-standard",
      category: "THERMAL_PADS" as const,
      shortDescription: "High-compressibility thermal pads",
      description: "Silicone-based thermal pads for VRAM, VRMs, and M.2 SSDs.",
      warrantyMonths: 12,
      status: "ACTIVE" as const,
      sortOrder: 4,
      isSellable: true,
    },
    {
      name: "LX-PAD Pro",
      slug: "lx-pad-pro",
      category: "THERMAL_PADS" as const,
      shortDescription: "Premium 12.8 W/mK thermal pads",
      description: "High-performance thermal pads for extreme builds and enterprise servers.",
      warrantyMonths: 12,
      status: "ACTIVE" as const,
      sortOrder: 5,
      isSellable: true,
    },
  ];

  const createdProducts: Record<string, string> = {};

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
    createdProducts[p.slug] = product.id;
    console.log(`  ✅ Product: ${product.name} (${product.id})`);
  }

  // ─── Product Variants ──────────────────────────────────────────────────────
  const variants = [
    { productSlug: "lx-tim-pro", name: "3.5g Syringe", sku: "LXTIM-PRO-3.5G", price: 49900, mrp: 69900, stock: 100, isDefault: true },
    { productSlug: "lx-tim-pro", name: "5g Syringe", sku: "LXTIM-PRO-5G", price: 69900, mrp: 99900, stock: 80 },
    { productSlug: "lx-tim-standard", name: "3.5g Syringe", sku: "LXTIM-STD-3.5G", price: 34900, mrp: 49900, stock: 150, isDefault: true },
    { productSlug: "lx-lm-pro", name: "1.0g Applicator", sku: "LXLM-PRO-1G", price: 119900, mrp: 149900, stock: 50, isDefault: true },
    { productSlug: "lx-pad-standard", name: "1.5mm 100x100mm", sku: "LXPAD-STD-1.5", price: 29900, mrp: 39900, stock: 200, isDefault: true },
    { productSlug: "lx-pad-pro", name: "2.0mm 100x100mm", sku: "LXPAD-PRO-2.0", price: 54900, mrp: 69900, stock: 75, isDefault: true },
  ];

  for (const v of variants) {
    const productId = createdProducts[v.productSlug];
    if (!productId) continue;
    await prisma.productVariant.upsert({
      where: { sku: v.sku },
      update: { name: v.name, price: v.price, mrp: v.mrp, stock: v.stock, isDefault: v.isDefault || false },
      create: { productId, name: v.name, sku: v.sku, price: v.price, mrp: v.mrp, stock: v.stock, isDefault: v.isDefault || false },
    });
    console.log(`  ✅ Variant: ${v.name} (${v.sku})`);
  }

  // ─── Product Models ────────────────────────────────────────────────────────
  const models = [
    { productSlug: "lx-tim-pro", name: "4g Syringe", sku: "MDL-LXTIM-PRO-4G" },
    { productSlug: "lx-tim-pro", name: "5g Syringe", sku: "MDL-LXTIM-PRO-5G" },
    { productSlug: "lx-tim-standard", name: "Standard Unit", sku: "MDL-LXTIM-STD" },
    { productSlug: "lx-lm-pro", name: "1.0g Applicator", sku: "MDL-LXLM-PRO-1G" },
    { productSlug: "lx-pad-standard", name: "1.5mm Sheet", sku: "MDL-LXPAD-STD-1.5" },
    { productSlug: "lx-pad-pro", name: "2.0mm Sheet", sku: "MDL-LXPAD-PRO-2.0" },
  ];

  const createdModels: Record<string, string> = {};
  for (const m of models) {
    const productId = createdProducts[m.productSlug];
    if (!productId) continue;
    const existing = await prisma.productModel.findFirst({ where: { productId, name: m.name } });
    if (existing) {
      createdModels[m.sku] = existing.id;
    } else {
      const model = await prisma.productModel.create({ data: { productId, name: m.name, sku: m.sku } });
      createdModels[m.sku] = model.id;
      console.log(`  ✅ Model: ${m.name}`);
    }
  }

  // ─── Serial Numbers ────────────────────────────────────────────────────────
  const serials = [
    { serial: "TLX-1001-2026", productSlug: "lx-tim-pro", modelSku: "MDL-LXTIM-PRO-4G", batch: "BATCH-2026-A" },
    { serial: "TLX-8821-9942", productSlug: "lx-tim-pro", modelSku: "MDL-LXTIM-PRO-5G", batch: "BATCH-2026-A" },
    { serial: "TLX-5512-3301", productSlug: "lx-lm-pro", modelSku: "MDL-LXLM-PRO-1G", batch: "BATCH-2026-B" },
    { serial: "TLX-9940-1122", productSlug: "lx-pad-standard", modelSku: "MDL-LXPAD-STD-1.5", batch: "BATCH-2026-C" },
    { serial: "TLX-7733-4411", productSlug: "lx-pad-pro", modelSku: "MDL-LXPAD-PRO-2.0", batch: "BATCH-2026-C" },
  ];

  for (const s of serials) {
    const productId = createdProducts[s.productSlug];
    const modelId = createdModels[s.modelSku] || null;
    if (!productId) continue;
    await prisma.serialNumber.upsert({
      where: { serialNumber: s.serial },
      update: {},
      create: { productId, productModelId: modelId, serialNumber: s.serial, batchCode: s.batch, isRegistered: false, isActive: true },
    });
    console.log(`  ✅ Serial: ${s.serial}`);
  }

  // ─── Order Counter ─────────────────────────────────────────────────────────
  await prisma.orderCounter.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, count: 0, year: new Date().getFullYear() },
  });
  console.log("  ✅ Order counter initialized");

  console.log("\n🎉 Seed complete!\n");
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
