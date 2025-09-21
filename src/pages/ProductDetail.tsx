import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Star, Heart, Share2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { products } from "@/data/products"
import { useState } from "react"

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === Number(id))
  const { addToCart, removeFromCart, isInCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Product Not Found</h1>
          <Link to='/'>
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const inCart = isInCart(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleRemoveFromCart = () => {
    removeFromCart(product.id)
  }

  return (
    
    <div className='min-h-screen bg-gradient-hero'>
      <div className='container mx-auto px-4 py-8'>
        {/* Back Button */}
        <Link
          to='/'
          className='inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8'
        >
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back to Products
        </Link>

        <div className='grid grid-rows-6 gap-12 items-start'>
          {/* Product Image */}
          <div className='space-y-4'>
            <Card className='overflow-hidden bg-gradient-card shadow-card border-0'>
              <img
                src={product.image}
                alt={product.title}
                className='w-full h-96 lg:h-[500px] object-cover'
              />
            </Card>

            {/* Thumbnail images would go here */}
            <div className='grid grid-cols-4 gap-4'>
              {[1, 2, 3, 4].map((i) => (
                <Card
                  key={i}
                  className='overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-opacity'
                >
                  <img
                    src={product.image}
                    alt={`${product.title} ${i}`}
                    className='w-full h-20 object-cover'
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            <div>
              <Badge variant='secondary' className='mb-3'>
                {product.category}
              </Badge>
              <h1 className='text-3xl lg:text-4xl font-bold mb-4'>
                {product.title}
              </h1>
              <div className='flex items-center space-x-4 mb-4'>
                <div className='flex items-center'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className='h-5 w-5 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                  <span className='text-muted-foreground ml-2'>
                    (128 reviews)
                  </span>
                </div>
              </div>
              <p className='text-muted-foreground text-lg leading-relaxed'>
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className='flex items-baseline space-x-4'>
              <span className='text-4xl font-bold text-brand-primary'>
                ${product.price}
              </span>
              <span className='text-xl text-muted-foreground line-through'>
                ${(product.price * 1.2).toFixed(2)}
              </span>
              <Badge variant='destructive'>20% OFF</Badge>
            </div>

            {/* Quantity Selector */}
            <div className='flex items-center space-x-4'>
              <span className='font-medium'>Quantity:</span>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className='h-4 w-4' />
                </Button>
                <span className='w-12 text-center font-medium'>{quantity}</span>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              {inCart ? (
                <Button
                  variant='destructive'
                  size='lg'
                  className='flex-1'
                  onClick={handleRemoveFromCart}
                >
                  Remove from Cart
                </Button>
              ) : (
                <Button
                  size='lg'
                  className='flex-1 bg-gradient-primary hover:shadow-button transition-all duration-300 transform hover:scale-105'
                  onClick={handleAddToCart}
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              )}

              <div className='flex space-x-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setIsLiked(!isLiked)}
                  className='transition-bounce transform hover:scale-110'
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  className='transition-bounce transform hover:scale-110'
                >
                  <Share2 className='h-5 w-5' />
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <Card className='bg-gradient-card shadow-card border-0'>
              <CardContent className='p-6'>
                <h3 className='font-semibold mb-4'>Product Features</h3>
                <ul className='space-y-2 text-muted-foreground'>
                  <li className='flex items-start'>
                    <span className='w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0'></span>
                    Premium quality materials and construction
                  </li>
                  <li className='flex items-start'>
                    <span className='w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0'></span>
                    30-day money-back guarantee
                  </li>
                  <li className='flex items-start'>
                    <span className='w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0'></span>
                    Free shipping on orders over $50
                  </li>
                  <li className='flex items-start'>
                    <span className='w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0'></span>
                    24/7 customer support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
