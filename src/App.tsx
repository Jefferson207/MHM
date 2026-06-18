import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
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

const navItems = [
  { label: 'Comprar', href: '#catalogo' },
  { label: 'Destacados', href: '#destacados' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'Redes', href: '#redes' },
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

function EditorialProductSlide({
  product,
  index,
  onOpen,
}: {
  product: Product
  index: number
  onOpen: (product: Product) => void
}) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.24) }}
      className="group min-w-[88vw] snap-center lg:min-w-[76vw] xl:min-w-[68vw]"
    >
      <button type="button" onClick={() => onOpen(product)} className="block w-full text-left">
        <div className="relative h-[68vh] min-h-[560px] overflow-hidden rounded-[32px] bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
          <img
            src={product.image}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.src = product.fallbackImage
            }}
            className="h-full w-full object-cover object-top opacity-90 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-7 sm:flex-row sm:items-end sm:justify-between sm:p-10">
            <div>
              <h3 className="max-w-2xl text-3xl font-black uppercase leading-none text-white sm:text-5xl">{product.name}</h3>
              <p className="mt-4 text-2xl font-black text-red-500">{product.price}</p>
            </div>
            <span className="inline-flex min-h-13 w-fit items-center justify-center rounded-full bg-white px-8 text-xs font-black uppercase tracking-[0.18em] text-black transition group-hover:bg-red-600 group-hover:text-white">
              Comprar <ArrowRight size={16} className="ml-2" />
            </span>
          </div>
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
            className="h-[360px] w-full rounded-2xl object-cover object-top sm:h-[620px]"
          />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.gallery.map((image) => (
              <button key={image} type="button" onClick={() => setActiveImage(image)} className="overflow-hidden rounded-xl border border-white/10">
                <img
                  src={image}
                  alt={product.name}
                  onError={(event) => {
                    event.currentTarget.src = product.fallbackImage
                  }}
                  className="h-20 w-full object-cover object-top opacity-80 transition hover:scale-105 hover:opacity-100 sm:h-24"
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
  const featuredRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll()
  const heroProductY = useTransform(scrollYProgress, [0, 0.28], [0, -70])
  const heroProductScale = useTransform(scrollYProgress, [0, 0.28], [1, 1.04])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const moveFeatured = (direction: 'left' | 'right') => {
    featuredRef.current?.scrollBy({
      left: direction === 'right' ? 390 : -390,
      behavior: 'smooth',
    })
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-black font-sans text-white">
      <div className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl transition duration-500 ${scrolled ? 'border-white/10 bg-black/90 shadow-[0_18px_60px_rgba(0,0,0,0.45)]' : 'border-white/0 bg-black/20'}`}>
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-8">
          <a href="#inicio" className="group flex items-center gap-3">
            <img src="/logo-mhm.svg" alt="Logo MHM URBAN" className="h-11 w-11 rounded-full border border-white/20 object-cover shadow-[0_0_35px_rgba(220,38,38,0.5)] sm:h-14 sm:w-14" />
            <span className="leading-none">
              <span className="block text-sm font-black tracking-[0.14em] sm:text-lg sm:tracking-[0.18em]">MHM URBAN</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-zinc-500 sm:text-[10px] sm:tracking-[0.3em]">Eleva tu estilo</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#catalogo" className="hidden items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black sm:flex">
              <ShoppingBag size={17} />
              Comprar
            </a>
            <a href="#catalogo" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden" aria-label="Ir al catalogo">
              <Menu size={20} />
            </a>
          </div>
        </header>
      </div>

      <section id="inicio" className="relative min-h-screen overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(220,38,38,0.24),transparent_34%),radial-gradient(circle_at_12%_18%,rgba(220,38,38,0.12),transparent_26%),linear-gradient(135deg,#020202,#070707_48%,#110202)]" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/[0.04] to-transparent" />

        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-16 px-5 py-20 sm:min-h-[calc(100vh-5rem)] sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-24">
          <motion.div initial={{ opacity: 0, x: -34 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="z-10">
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

          <motion.div
            initial={{ opacity: 0, x: 38, y: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{ opacity: { duration: 0.85, ease: 'easeOut' }, x: { duration: 0.85, ease: 'easeOut' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
            style={{ y: heroProductY, scale: heroProductScale }}
            className="relative min-h-[460px] lg:min-h-[720px]"
          >
            <div className="absolute inset-6 rounded-[40px] bg-red-600/20 blur-3xl" />
            <img
              src="/products/prenda-01.jpg"
              alt=""
              aria-hidden="true"
              onError={(event) => {
                event.currentTarget.src = products[0].fallbackImage
              }}
              className="absolute left-1/2 top-12 h-[480px] w-[78%] -translate-x-1/2 rounded-[40px] object-cover object-top opacity-30 blur-2xl lg:h-[680px]"
            />
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-white/10 to-transparent opacity-30" />
            <img
              src="/products/prenda-01.jpg"
              alt="Producto estrella MHM URBAN"
              onError={(event) => {
                event.currentTarget.src = products[0].fallbackImage
              }}
              className="relative mx-auto h-[520px] w-full max-w-[540px] rounded-[40px] object-cover object-top shadow-[0_0_90px_rgba(220,38,38,0.28)] drop-shadow-[0_38px_90px_rgba(0,0,0,0.8)] lg:h-[760px]"
            />
          </motion.div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-red-600 py-4 text-black">
        <div className="marquee-track flex w-max gap-10 text-sm font-black uppercase tracking-[0.28em]">
          {[1, 2].map((item) => (
            <span key={item} className="whitespace-nowrap">
              MHM URBAN • NUEVA COLECCION • ENVIOS A TODO LIMA • CALIDAD PREMIUM • MODA URBANA • MHM URBAN •
            </span>
          ))}
        </div>
      </div>

      <section id="catalogo" className="relative px-4 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-red-500">Nueva coleccion</p>
              <h2 className="text-4xl font-black uppercase leading-tight text-white sm:text-6xl">Coleccion destacada</h2>
              <p className="mt-5 text-base leading-8 text-zinc-400">Seleccion exclusiva de MHM Urban.</p>
            </motion.div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => moveFeatured('left')} className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black text-white transition hover:border-red-600 hover:bg-red-600" aria-label="Ver producto anterior">
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={() => moveFeatured('right')} className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white text-black transition hover:border-red-600 hover:bg-red-600 hover:text-white" aria-label="Ver producto siguiente">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div ref={featuredRef} className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth px-4 pb-5 sm:-mx-8 sm:px-8">
            {products.map((product, index) => (
              <EditorialProductSlide key={product.name} product={product} index={index} onOpen={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>

      <section id="destacados" className="px-4 py-24 sm:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {[
            {
              title: 'Nueva coleccion',
              text: 'Explora las prendas mas exclusivas.',
              action: 'Ver mas',
              image: products[0].image,
              fallbackImage: products[0].fallbackImage,
              href: '#catalogo',
            },
            {
              title: 'Street collection',
              text: 'Disenos urbanos para destacar.',
              action: 'Comprar',
              image: products[7].image,
              fallbackImage: products[7].fallbackImage,
              href: '#catalogo',
            },
          ].map((banner, index) => (
            <motion.a
              key={banner.title}
              href={banner.href}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group relative h-[700px] overflow-hidden rounded-[32px] bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.28)]"
            >
              <img
                src={banner.image}
                alt={banner.title}
                onError={(event) => {
                  event.currentTarget.src = banner.fallbackImage
                }}
                className="h-full w-full object-cover object-top opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                <h3 className="text-4xl font-black uppercase text-white sm:text-5xl">{banner.title}</h3>
                <p className="mt-4 max-w-sm text-base text-zinc-300">{banner.text}</p>
                <span className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-xs font-black uppercase tracking-[0.18em] text-black transition group-hover:bg-red-600 group-hover:text-white">
                  {banner.action}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="categorias" className="px-4 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Categorias" title="Compra por estilo" text="Explora las lineas principales de MHM Urban." />
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category, index) => (
              <motion.a
                key={category.title}
                href="#catalogo"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: index * 0.06 }}
                className="group relative h-[540px] overflow-hidden rounded-[32px] bg-zinc-950"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  onError={(event) => {
                    event.currentTarget.src = category.fallbackImage
                  }}
                  className="h-full w-full object-cover object-top opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="text-4xl font-black uppercase text-white sm:text-5xl">{category.title}</h3>
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
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
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

      <a href="#catalogo" className="fixed inset-x-4 bottom-4 z-50 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-red-600 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_0_45px_rgba(220,38,38,0.5)] transition active:scale-[0.98] sm:hidden">
        <ShoppingBag size={18} />
        Comprar ahora
      </a>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  )
}

export default App
