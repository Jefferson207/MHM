import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Camera,
  Check,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Music2,
  PackageCheck,
  Plus,
  Send,
  Shirt,
  ShoppingBag,
  Star,
  Truck,
  Users,
  X,
  Zap,
} from 'lucide-react'

const whatsappBase = 'https://wa.me/51986726299'
const whatsappMessageUrl = `${whatsappBase}?text=${encodeURIComponent('Hola, quiero comprar en MHM URBAN. Me puedes ayudar?')}`

const navItems = [
  { label: 'Coleccion', href: '#catalogo' },
  { label: 'Mas vendidos', href: '#destacados' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'Contacto', href: '#redes' },
]

type Product = {
  name: string
  price: string
  sizes: string[]
  image: string
  fallbackImage: string
  gallery: string[]
  description: string
}

const productSeed = [
  [
    'Conjunto White Cargo',
    'S/ 189',
    ['S', 'M', 'L', 'XL'],
    '/products/prenda-01.jpg',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=90',
    'Conjunto blanco con polera de cuello alto y jogger cargo. Look limpio, moderno y premium.',
  ],
  [
    'Hoodie Wolf Black',
    'S/ 129',
    ['S', 'M', 'L', 'XL'],
    '/products/prenda-02.jpg',
    'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1100&q=90',
    'Polera negra con capucha y grafico central. Ideal para un outfit urbano con impacto visual.',
  ],
  [
    'Casaca Fur Black',
    'S/ 159',
    ['M', 'L', 'XL'],
    '/products/prenda-03.jpg',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1100&q=90',
    'Casaca negra con interior afelpado, cierre completo y silueta masculina.',
  ],
  [
    'Casaca Fur Navy',
    'S/ 159',
    ['M', 'L', 'XL'],
    '/products/prenda-04.jpg',
    'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1100&q=90',
    'Casaca azul con interior afelpado. Una prenda sobria para elevar looks casuales.',
  ],
  [
    'Polo Sand Lines',
    'S/ 69',
    ['S', 'M', 'L', 'XL'],
    '/products/prenda-05.jpg',
    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1100&q=90',
    'Polo beige con contraste coral y lineas frontales. Ligero, urbano y facil de combinar.',
  ],
  [
    'Hoodie Aqua Cargo',
    'S/ 139',
    ['S', 'M', 'L', 'XL'],
    '/products/prenda-06.jpg',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1100&q=90',
    'Hoodie turquesa con bolsillos cargo y cierres. Color statement para destacar.',
  ],
  [
    'Polo White Contrast',
    'S/ 69',
    ['S', 'M', 'L', 'XL'],
    '/products/prenda-07.jpg',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1100&q=90',
    'Polo blanco con contraste negro. Minimalista, limpio y de corte masculino.',
  ],
  [
    'Hoodie Cargo Black',
    'S/ 139',
    ['S', 'M', 'L', 'XL'],
    '/products/prenda-08.jpg',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1100&q=90',
    'Hoodie negro con cierres y bolsillos frontales. Estilo urbano con detalles premium.',
  ],
] as const

const products: Product[] = productSeed.map(([name, price, sizes, image, fallbackImage, description]) => ({
  name,
  price,
  sizes: [...sizes],
  image,
  fallbackImage,
  gallery: [image, image.replace('.jpg', '-a.jpg'), image.replace('.jpg', '-b.jpg')],
  description,
}))

const instagramPosts = [products[0], products[1], products[2], products[3], products[4], products[5], products[6], products[7]]

const reasons = [
  { title: 'Estilo urbano', text: 'Looks listos para destacar.', icon: Shirt },
  { title: 'Atencion rapida', text: 'Compra directa por WhatsApp.', icon: Zap },
  { title: 'Envios en Lima', text: 'Coordina entrega al instante.', icon: Truck },
  { title: 'Compra facil', text: 'Elige talla y confirma.', icon: PackageCheck },
]

const socials = [
  { name: 'Instagram', href: '#', icon: Camera },
  { name: 'Facebook', href: '#', icon: Users },
  { name: 'TikTok', href: '#', icon: Music2 },
  { name: 'Canal WhatsApp', href: whatsappBase, icon: MessageCircle },
]

const categories = [
  { title: 'Polos', image: products[4].image, fallbackImage: products[4].fallbackImage },
  { title: 'Casacas', image: products[2].image, fallbackImage: products[2].fallbackImage },
  { title: 'Conjuntos', image: products[0].image, fallbackImage: products[0].fallbackImage },
  { title: 'Accesorios', image: products[7].image, fallbackImage: products[7].fallbackImage },
]

const trustItems = ['Calidad premium', 'Compra segura', 'Atencion inmediata', 'Envios en Lima']

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
}

function buyUrl(product: string, size: string, quantity = 1) {
  return `${whatsappBase}?text=${encodeURIComponent(`Hola, quiero comprar ${product}, talla ${size}. Cantidad: ${quantity}.`)}`
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
    >
      <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-red-500">{eyebrow}</p>
      <h2 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
      {text ? <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">{text}</p> : null}
    </motion.div>
  )
}

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.02 3.2A12.73 12.73 0 0 0 5.1 22.5L3.4 28.8l6.45-1.69a12.7 12.7 0 0 0 6.16 1.57h.01A12.74 12.74 0 0 0 16.02 3.2Zm0 23.34h-.01a10.56 10.56 0 0 1-5.38-1.47l-.39-.23-3.83 1 1.02-3.73-.25-.38a10.59 10.59 0 1 1 8.84 4.81Zm5.8-7.92c-.32-.16-1.88-.93-2.17-1.04-.29-.1-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.25-.61-.51-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  )
}

function ProductCard({
  product,
  index,
  compact = false,
  onOpen,
}: {
  product: Product
  index: number
  compact?: boolean
  onOpen: (product: Product) => void
}) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.62, delay: Math.min(index * 0.04, 0.22) }}
      whileHover={{ y: -6 }}
      className={`group ${compact ? 'min-w-[62vw] sm:min-w-[330px] lg:min-w-[340px]' : ''}`}
    >
      <button
        type="button"
        onClick={() => onOpen(product)}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          setSpotlight({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
          })
        }}
        className="block w-full rounded-3xl text-left transition duration-500 hover:scale-[1.015] hover:shadow-[0_0_45px_rgba(220,38,38,0.14)]"
        style={{
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(220,38,38,0.16), transparent 34%)`,
        }}
      >
        <div className="relative h-[260px] overflow-hidden rounded-3xl bg-zinc-950 shadow-[0_18px_55px_rgba(0,0,0,0.22)] sm:h-[390px] lg:h-[430px]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = product.fallbackImage
            }}
            className="h-full w-full object-cover object-top opacity-90 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-0"
          />
          <img
            src={product.gallery[1]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = product.fallbackImage
            }}
            className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        </div>
        <div className="pt-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
            <div>
              <h3 className="text-sm font-black uppercase leading-tight tracking-wide text-white sm:text-lg">{product.name}</h3>
            </div>
            <p className="shrink-0 text-base font-black text-white sm:text-lg">{product.price}</p>
          </div>
          <span className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/10 bg-white px-4 text-[10px] font-black uppercase tracking-[0.14em] text-black transition duration-300 group-hover:scale-[1.02] group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white sm:mt-5 sm:min-h-12 sm:px-5 sm:text-xs sm:tracking-[0.18em]">
            Ver producto
          </span>
        </div>
      </button>
    </motion.article>
  )
}

function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    if (!product) return
    setSize(product.sizes[0])
    setQuantity(1)
    setActiveImage(product.image)
  }, [product])

  if (!product) return null

  return (
    <motion.div className="fixed inset-0 z-[80] overflow-y-auto bg-black/80 px-4 py-5 backdrop-blur-xl sm:py-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button className="fixed inset-0 cursor-default" type="button" onClick={onClose} aria-label="Cerrar producto" />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_40px_120px_rgba(0,0,0,0.7)] lg:grid-cols-[1.1fr_0.9fr]"
      >
        <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-red-600" aria-label="Cerrar">
          <X size={20} />
        </button>

        <div className="bg-black p-3 sm:p-5">
          <img
            src={activeImage}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.src = product.fallbackImage
            }}
            className="h-[360px] w-full rounded-2xl bg-black object-contain sm:h-[620px]"
          />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.gallery.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`flex h-28 items-center justify-center overflow-hidden rounded-xl border bg-black transition sm:h-28 ${
                  activeImage === image ? 'border-red-600' : 'border-white/10 hover:border-white/35'
                }`}
              >
                <img
                  src={image}
                  alt={product.name}
                  onError={(event) => {
                    event.currentTarget.src = product.fallbackImage
                  }}
                  className="h-full w-full object-contain opacity-95"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-red-500">MHM URBAN</p>
          <h3 className="mt-4 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">{product.name}</h3>
          <p className="mt-4 text-3xl font-black text-red-500">{product.price}</p>
          <p className="mt-6 text-base leading-8 text-zinc-400">{product.description}</p>

          <div className="mt-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Talla</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSize(item)}
                  className={`min-h-12 min-w-12 rounded-full border px-4 text-xs font-black uppercase transition ${
                    size === item ? 'border-red-600 bg-red-600 text-white' : 'border-white/15 bg-black text-white hover:border-white/45'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Cantidad</p>
            <div className="inline-flex overflow-hidden rounded-full border border-white/15 bg-black">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid h-12 w-12 place-items-center hover:bg-white/10">
                <Minus size={16} />
              </button>
              <span className="grid h-12 w-14 place-items-center text-sm font-black">{quantity}</span>
              <button type="button" onClick={() => setQuantity(quantity + 1)} className="grid h-12 w-12 place-items-center hover:bg-white/10">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <a href={buyUrl(product.name, size, quantity)} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-red-600 px-7 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black active:scale-[0.98]">
            <MessageCircle size={18} />
            Comprar por WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursor, setCursor] = useState({ x: -200, y: -200 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-black font-sans text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 mesh-bg" />
      <div className="pointer-events-none fixed inset-0 -z-10 noise-layer" />
      <motion.div
        className="pointer-events-none fixed z-[3] hidden h-56 w-56 rounded-full bg-red-600/10 blur-3xl lg:block"
        animate={{ x: cursor.x - 112, y: cursor.y - 112 }}
        transition={{ type: 'spring', stiffness: 90, damping: 26, mass: 0.4 }}
      />
      <div className={`fixed inset-x-0 top-0 z-50 border-b transition duration-500 ${scrolled ? 'border-white/10 bg-black/70 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-[20px]' : 'border-white/0 bg-black/10 backdrop-blur-sm'}`}>
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-8">
          <a href="#inicio" className="group flex items-center gap-3">
            <img src="/logo-mhm.svg" alt="Logo MHM URBAN" className={`h-11 w-11 rounded-full border border-white/20 object-cover transition duration-500 sm:h-14 sm:w-14 ${scrolled ? 'shadow-[0_0_42px_rgba(220,38,38,0.48)]' : 'shadow-[0_0_24px_rgba(220,38,38,0.28)]'}`} />
            <span className="leading-none">
              <span className="block text-sm font-black tracking-[0.14em] sm:text-lg sm:tracking-[0.18em]">MHM URBAN</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-zinc-500 sm:text-[10px] sm:tracking-[0.3em]">Eleva tu estilo</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#catalogo" className="hidden items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black sm:flex">
              <ShoppingBag size={17} />
              Comprar
            </a>
            <button type="button" onClick={() => setMenuOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-red-600 hover:bg-red-600/20 lg:hidden" aria-label="Abrir menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
        <motion.div
          initial={false}
          animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="overflow-hidden border-t border-white/10 bg-black/85 backdrop-blur-[20px] lg:hidden"
        >
          <nav className="mx-auto grid max-w-7xl gap-2 px-4 py-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/10 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-red-600 hover:bg-red-600/15"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>

      <section id="inicio" className="relative min-h-[88svh] overflow-hidden pt-16 sm:min-h-[92svh] sm:pt-20">
        <div className="absolute inset-0">
          <img
            src="/products/prenda-05.jpg"
            alt="Moda urbana MHM URBAN"
            loading="eager"
            onError={(event) => {
              event.currentTarget.src = products[4].fallbackImage
            }}
            className="h-full w-full object-cover object-[62%_center] opacity-55"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_25%,rgba(220,38,38,0.34),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.98),rgba(0,0,0,0.78)_42%,rgba(0,0,0,0.35))]" />
          <div className="absolute inset-0 street-grid opacity-55" />
        </div>

        <motion.div
          style={{ y: scrolled ? -10 : 0 }}
          className="relative z-10 mx-auto grid min-h-[calc(88svh-4rem)] max-w-7xl items-center px-5 py-14 sm:min-h-[calc(92svh-5rem)] sm:px-8"
        >
          <motion.div initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="z-10 max-w-4xl">
            <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.86] text-white sm:text-8xl lg:text-9xl">
              ELEVA TU <span className="block text-red-600 drop-shadow-[0_0_34px_rgba(220,38,38,0.85)]">ESTILO</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-xl sm:leading-8">Moda urbana para hombres que buscan destacar.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#catalogo" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-white px-8 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-red-600 hover:text-white active:scale-[0.98]">
                Comprar ahora
                <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </a>
              <a href="#categorias" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 text-sm font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:border-red-600 hover:bg-red-600/20 active:scale-[0.98]">
                Ver coleccion
              </a>
            </div>

            <div className="mt-12">
              <div className="flex items-center gap-2 text-sm font-black text-white">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={16} className="fill-red-600 text-red-600" />
                ))}
                <span className="ml-2 tracking-wide">4.9/5</span>
              </div>
              <div className="mt-5 grid gap-3 text-sm font-bold text-zinc-300 sm:grid-cols-2">
                {trustItems.map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <Check size={16} className="text-red-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-red-600 py-4 text-black">
        <div className="marquee-track flex w-max gap-10 text-sm font-black uppercase tracking-[0.28em]">
          {[1, 2].map((item) => (
            <span key={item} className="whitespace-nowrap">
              MHM URBAN - NUEVA COLECCION - ENVIOS A TODO LIMA - CALIDAD PREMIUM - MODA URBANA - MHM URBAN -
            </span>
          ))}
        </div>
      </div>

      <section id="catalogo" className="relative px-4 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Nueva coleccion" title="Coleccion destacada" text="Seleccion exclusiva de MHM Urban." />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} onOpen={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>

      <section id="destacados" className="bg-zinc-950/70 px-4 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Destacados" title="Mas vendidos" text="Prendas seleccionadas para comprar rapido y sin complicaciones." />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-10 grid overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:grid-cols-[0.92fr_1.08fr]"
          >
            <div className="relative min-h-[360px] overflow-hidden bg-black">
              <div className="absolute inset-0 bg-red-600/10 blur-3xl" />
              <img
                src={products[0].image}
                alt={products[0].name}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = products[0].fallbackImage
                }}
                className="relative h-full w-full object-contain p-5 transition duration-700 hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="flex items-center gap-2 text-sm font-black text-red-500">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={15} className="fill-red-600 text-red-600" />
                ))}
                <span className="ml-2 text-white">4.9</span>
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.32em] text-red-500">Best Seller</p>
              <h3 className="mt-3 text-3xl font-black uppercase leading-tight text-white sm:text-5xl">{products[0].name}</h3>
              <p className="mt-4 text-3xl font-black text-white">{products[0].price}</p>
              <button
                type="button"
                onClick={() => setSelectedProduct(products[0])}
                className="mt-7 inline-flex min-h-13 w-fit items-center justify-center gap-3 rounded-full bg-red-600 px-8 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:scale-[1.03] hover:bg-white hover:text-black"
              >
                Comprar <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
          <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-5 sm:-mx-8 sm:px-8">
            {products.slice(0, 6).map((product, index) => (
              <div key={product.name} className="snap-start">
                <ProductCard product={product} index={index} compact onOpen={setSelectedProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categorias" className="px-4 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Categorias" title="Compra por estilo" text="Explora las lineas principales de MHM Urban." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category, index) => (
              <motion.a
                key={category.title}
                href="#catalogo"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: index * 0.06 }}
                className="group relative h-[420px] overflow-hidden rounded-3xl bg-zinc-950"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = category.fallbackImage
                  }}
                  className="h-full w-full object-cover object-top opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="text-3xl font-black uppercase text-white">{category.title}</h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="mhm" className="relative px-4 py-16 sm:px-8 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(220,38,38,0.16),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle eyebrow="MHM URBAN" title="Comprar debe ser simple" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <motion.div key={reason.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.65, delay: index * 0.06 }} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:border-red-500/45">
                  <div className="mb-6 grid h-12 w-12 place-items-center rounded-full border border-red-500/50 bg-red-600/15 text-red-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-black uppercase text-white">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{reason.text}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="instagram" className="px-4 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Instagram" title="Visual MHM" text="Inspiracion de outfits, detalles y drops con estilo editorial." />
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
            {instagramPosts.map((product, index) => (
              <motion.div key={`${product.name}-${index}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.62, delay: index * 0.04 }} className="mb-4 overflow-hidden rounded-2xl bg-zinc-950">
                <img
                  src={product.image}
                  alt="Publicacion Instagram MHM URBAN"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = product.fallbackImage
                  }}
                  className={`w-full object-cover transition duration-700 hover:scale-105 ${index % 3 === 0 ? 'h-80' : 'h-56'}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="redes" className="border-y border-white/10 bg-white/[0.03] px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-red-500">Redes sociales</p>
            <h2 className="text-3xl font-black uppercase text-white sm:text-4xl">Sigue el drop</h2>
            <p className="mt-4 flex items-center gap-2 text-zinc-400">
              <MapPin size={18} className="text-red-500" />
              Lima, Peru
            </p>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a key={social.name} href={social.href} target={social.href === whatsappBase ? '_blank' : undefined} rel={social.href === whatsappBase ? 'noreferrer' : undefined} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className="group flex min-h-16 items-center justify-between rounded-2xl border border-white/10 bg-black/45 px-5 py-5 text-sm font-black uppercase tracking-[0.13em] text-white backdrop-blur-xl transition hover:border-red-500/70 hover:bg-red-600">
                  <span className="flex items-center gap-3">
                    <Icon size={20} />
                    {social.name}
                  </span>
                  <Send size={15} className="opacity-45 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="px-4 py-12 pb-24 sm:px-8 sm:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[32px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_0_80px_rgba(220,38,38,0.08)] backdrop-blur-xl md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <img src="/logo-mhm.svg" alt="Logo MHM URBAN" className="h-16 w-16 rounded-full border border-white/15 object-cover" />
              <p className="text-3xl font-black uppercase tracking-[0.18em] text-white">MHM URBAN</p>
            </div>
            <p className="mt-3 text-zinc-500">ELEVA TU ESTILO.</p>
          </div>
          <div className="text-left text-sm text-zinc-500 md:text-right">
            <p>Telefono: 986726299</p>
            <p className="mt-2">Facebook / Instagram / TikTok / Canal de WhatsApp</p>
          </div>
        </div>
      </footer>

      <a href="#catalogo" className="fixed bottom-4 left-4 right-20 z-50 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-red-600 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_0_45px_rgba(220,38,38,0.5)] transition active:scale-[0.98] sm:hidden">
        <ShoppingBag size={18} />
        Comprar ahora
      </a>

      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, x: 14, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.8, ease: 'easeOut' }}
          className="relative hidden rounded-full border border-white/10 bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-black shadow-[0_18px_45px_rgba(0,0,0,0.35)] sm:block"
        >
          Escribenos por WhatsApp
          <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white" />
        </motion.div>
        <a
          href={whatsappMessageUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Comprar por WhatsApp"
          className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_40px_rgba(37,211,102,0.45)] ring-1 ring-white/20 transition hover:scale-105 hover:bg-[#1ebe5d] active:scale-95"
        >
          <WhatsAppIcon size={30} />
        </a>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  )
}

export default App
