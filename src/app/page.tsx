export default function HomePage() {
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="space-y-2 border-b border-zinc-800 pb-4">
        <h1 className="text-4xl font-bold text-moss">LiveStock Check Client</h1>
        <p className="text-zinc-400">
          Design system and scaffold initialization verified.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-default bg-mist text-zinc-950 font-medium">
            Mist (#ECF4E8)
          </div>
          <div className="p-4 rounded-default bg-sprout text-zinc-950 font-medium">
            Sprout (#CBF3BB)
          </div>
          <div className="p-4 rounded-default bg-moss text-zinc-950 font-medium">
            Moss (#ABE7B2)
          </div>
          <div className="p-4 rounded-default bg-harbor text-zinc-950 font-medium">
            Harbor (#93BFC7)
          </div>
        </div>
      </section>

      <section className="p-6 rounded-default border border-zinc-800 bg-zinc-900/50 space-y-4">
        <h3 className="text-xl font-medium text-sprout">Font Testing</h3>
        <p className="text-base text-zinc-300">
          Body text using Inter font. Clean, legible, and modern UI text.
        </p>
        <div className="p-3 bg-zinc-950 rounded-default border border-zinc-800">
          <span className="text-sm font-data text-harbor">
            SKU: LSTK-9082 | QTY: 45 | PRICE: $1,250.00
          </span>
        </div>
      </section>
    </main>
  );
}
