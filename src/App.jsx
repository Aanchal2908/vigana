import { useMemo, useState } from 'react'

const fallbackImage = `${import.meta.env.BASE_URL}favicon.svg`

const products = [
  {
    id: 1,
    name: 'Hematite Bracelet',
    price: 199,
    image: `${import.meta.env.BASE_URL}images/hematite.png.jpeg`,
    description: 'Grounding beaded bracelet with a detailed silver charm.',
    speciality: 'Hematite • Grounding • Strength (Root Chakra)',
  },
  {
    id: 2,
    name: 'Amethyst Earrings',
    price: 359,
    image: `${import.meta.env.BASE_URL}images/amethyst,png.jpeg`,
    description: 'Gold-wrapped amethyst earrings for calm, protective energy.',
    speciality: 'Amethyst • Calm • Protection (Third Eye & Crown)',
  },
  {
    id: 3,
    name: 'Ruby Sun Necklace',
    price: 450,
    image: `${import.meta.env.BASE_URL}images/ruby.png.jpeg`,
    description: 'Bold ruby pendant with sun charm for radiant confidence.',
    speciality: 'Ruby • Confidence • Vitality (Sun)',
  },
  {
    id: 4
    name: 'Rose Quartz Heart Necklace',
    price: 399,
    image: `${import.meta.env.BASE_URL}images/rose-quartz.png.jpeg`,
    description: 'Soft pink rose quartz pendant for love and harmony.',
    speciality: 'Rose Quartz • Love • Harmony (Heart Chakra)',
  },
  {
    id: 5,
    name: 'Emerald Leaf Necklace',
    price: 349,
    image: `${import.meta.env.BASE_URL}images/emerald.png.jpeg`,
    description: 'Emerald pendant with leaf charm for growth and wisdom.',
    speciality: 'Emerald • Growth • Wisdom (Mercury)',
  },
  {
    id: 6,
    name: 'Yellow Sapphire Bracelet',
    price: 249,
    image: `${import.meta.env.BASE_URL}images/yellow-sapphire.png.jpeg`,
    description: 'Warm yellow sapphire bracelet for wealth and fortune.',
    speciality: 'Yellow Sapphire • Wealth • Fortune (Jupiter)',
  },
]

const stoneMeaningMap = {
  Ruby: 'Confidence & Vitality',
  Emerald: 'Growth & Wisdom',
  'Yellow Sapphire': 'Wealth & Fortune',
  Amethyst: 'Calm & Protection',
  'Lapis Lazuli': 'Truth & Inner Vision',
}

const stoneImageMap = {
  Ruby: `${import.meta.env.BASE_URL}images/ruby.png.jpeg`,
  Emerald: `${import.meta.env.BASE_URL}images/emerald.png.jpeg`,
  'Yellow Sapphire': `${import.meta.env.BASE_URL}images/yellow-sapphire.png.jpeg`,
  Amethyst: `${import.meta.env.BASE_URL}images/amethyst,png.jpeg`,
  'Lapis Lazuli': `${import.meta.env.BASE_URL}images/hematite.png.jpeg`,
}

function App() {
  const [cartItems, setCartItems] = useState([])
  const [customization, setCustomization] = useState({
    stone: 'Ruby',
    jewelleryType: 'Necklace',
    pattern: 'Traditional',
    metal: 'Gold',
    requirements: '',
    referenceImageName: '',
  })
  const [designSummary, setDesignSummary] = useState('')
  const [requestMessage, setRequestMessage] = useState('')
  const [orderMessage, setOrderMessage] = useState('')
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const addToCart = (product) => {
    setCartItems((current) => [...current, product])
    setOrderMessage('')
  }

  const handleCustomizationChange = (field, value) => {
    setCustomization((current) => ({ ...current, [field]: value }))
    setRequestMessage('')
  }

  const handleReferenceUpload = (event) => {
    const file = event.target.files?.[0]
    handleCustomizationChange('referenceImageName', file ? file.name : '')
  }

  const generateSummary = () => {
    const meaning = stoneMeaningMap[customization.stone]
    const summary = `You selected a ${customization.metal} ${customization.stone} ${customization.jewelleryType} with ${customization.pattern} design for ${meaning}.`
    setDesignSummary(summary)
  }

  const submitRequest = () => {
    if (!customization.requirements.trim()) {
      setRequestMessage('Please add your custom text requirements before submitting.')
      return
    }

    setRequestMessage('Your custom jewellery request has been submitted!')
  }

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems],
  )

  const handleImageError = (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = fallbackImage
  }

  const placeOrder = () => {
    if (!cartItems.length) {
      setOrderMessage('Add at least one item to place your order.')
      return
    }

    setOrderMessage('Order placed successfully! Our team will contact you shortly.')
    setCartItems([])
    setIsOrderModalOpen(false)
  }

  const openOrderModal = () => {
    if (!cartItems.length) {
      setOrderMessage('Add at least one item to place your order.')
      return
    }

    setOrderMessage('')
    setIsOrderModalOpen(true)
  }

  const closeOrderModal = () => {
    setIsOrderModalOpen(false)
  }

  return (
    <div className="site">
      <header className="navbar">
        <div className="brand">Astra Stone Jewellery</div>
        <nav>
          <a href="#collections">Collections</a>
          <a href="#features">Features</a>
          <a href="#stories">Stories</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <p className="tag">Handcrafted Natural Gemstones</p>
          <h1>Wear the Beauty of Earth, Elegantly</h1>
          <p>
            Discover premium stone jewellery made with ethically sourced
            gemstones, artisan finishing, and timeless design.
          </p>
          <button>Shop New Arrivals</button>
        </div>
        <div className="hero-card">
          <h3>Cart Summary</h3>
          <p>{cartItems.length} item(s) added</p>
          <span>INR {totalPrice.toLocaleString('en-IN')}</span>
          <button type="button" onClick={openOrderModal}>
            Place Order
          </button>
          {orderMessage && <p className="order-message">{orderMessage}</p>}
        </div>
      </section>

      <section className="collections" id="collections">
        <h2>Shop Signature Pieces</h2>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} onError={handleImageError} />
              <div className="product-content">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="speciality">{product.speciality}</p>
                <div className="product-footer">
                  <span>INR {product.price.toLocaleString('en-IN')}</span>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="features" id="features">
        <h2>What Makes Our Stone Jewellery Special</h2>
        <div className="feature-list">
          <div>
            <h4>Authentic Gemstone Beauty</h4>
            <p>Each piece has unique color patterns, texture, and natural shine.</p>
          </div>
          <div>
            <h4>Elegant Everyday Styling</h4>
            <p>Designed to pair beautifully with both festive and daily outfits.</p>
          </div>
          <div>
            <h4>Premium Craftsmanship</h4>
            <p>Fine finishing, secure settings, and durable polish in every piece.</p>
          </div>
          <div>
            <h4>Meaningful Stone Specialization</h4>
            <p>From calm amethyst to loving rose quartz, each stone tells a story.</p>
          </div>
        </div>
      </section>

      <section className="customize" id="customize">
        <h2>Customize Your Jewellery</h2>
        <div className="customize-layout">
          <form className="custom-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              Stone Type
              <select
                value={customization.stone}
                onChange={(e) => handleCustomizationChange('stone', e.target.value)}
              >
                <option>Ruby</option>
                <option>Emerald</option>
                <option>Yellow Sapphire</option>
                <option>Amethyst</option>
                <option>Lapis Lazuli</option>
              </select>
            </label>

            <label>
              Jewellery Type
              <select
                value={customization.jewelleryType}
                onChange={(e) =>
                  handleCustomizationChange('jewelleryType', e.target.value)
                }
              >
                <option>Necklace</option>
                <option>Bracelet</option>
                <option>Earrings</option>
                <option>Ring</option>
              </select>
            </label>

            <label>
              Pattern / Style
              <select
                value={customization.pattern}
                onChange={(e) => handleCustomizationChange('pattern', e.target.value)}
              >
                <option>Traditional</option>
                <option>Minimal</option>
                <option>Modern</option>
                <option>Temple Design</option>
              </select>
            </label>

            <label>
              Metal Type
              <select
                value={customization.metal}
                onChange={(e) => handleCustomizationChange('metal', e.target.value)}
              >
                <option>Gold</option>
                <option>Silver</option>
                <option>Oxidized</option>
              </select>
            </label>

            <label>
              Custom Text Requirements
              <textarea
                placeholder="Describe preferred size, occasion, engraving, or any specific details..."
                value={customization.requirements}
                onChange={(e) =>
                  handleCustomizationChange('requirements', e.target.value)
                }
              />
            </label>

            <label>
              Upload Reference Image (Optional)
              <input type="file" accept="image/*" onChange={handleReferenceUpload} />
            </label>

            <div className="custom-actions">
              <button type="button" onClick={generateSummary}>
                Generate Design Summary
              </button>
              <button type="button" onClick={submitRequest}>
                Submit Request
              </button>
            </div>
          </form>

          <div className="preview-card">
            <h3>Live Preview</h3>
            <img
              src={stoneImageMap[customization.stone]}
              alt={`${customization.stone} preview`}
              onError={handleImageError}
            />
            <div className="preview-tags">
              <span>{customization.stone}</span>
              <span>{customization.jewelleryType}</span>
              <span>{customization.pattern}</span>
              <span>{customization.metal}</span>
            </div>
            <p className="meaning">
              Stone Meaning: {stoneMeaningMap[customization.stone]}
            </p>
            {customization.referenceImageName && (
              <p className="upload-name">
                Reference: {customization.referenceImageName}
              </p>
            )}
            {designSummary && <p className="design-summary">{designSummary}</p>}
            {requestMessage && <p className="request-message">{requestMessage}</p>}
          </div>
        </div>
      </section>

      <section className="stories" id="stories">
        <h2>Customer Love</h2>
        <blockquote>
          "The quality feels premium and the stone shines beautifully. I get
          compliments every single time I wear it."
        </blockquote>
        <p>- Meera S., Jaipur</p>
      </section>

      <footer className="contact" id="contact">
        <h2>Bring Home Your Signature Stone</h2>
        <p>Email: hello@astrastone.com | Instagram: @astrastonejewels</p>
      </footer>

      {isOrderModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="order-modal">
            <h3>Confirm Your Order</h3>
            <p>
              You are placing an order for {cartItems.length} item(s) worth INR{' '}
              {totalPrice.toLocaleString('en-IN')}.
            </p>
            <div className="order-modal-actions">
              <button type="button" onClick={closeOrderModal}>
                Cancel
              </button>
              <button type="button" onClick={placeOrder}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
