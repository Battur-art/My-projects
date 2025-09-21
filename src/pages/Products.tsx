import { useState } from "react"
import { Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/ProductCard"
import { products } from "@/data/products"
import Slider from "./slider"

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className='min-h-screen bg-gradient-hero'>
      <div className='container mx-auto px-4 py-8'>
        {/* Hero Section */}
        <Slider />
        <div className='text-center mb-12'>
          <h1 className='text-4xl lg:text-6xl font-bold mb-6'>
            Welcome to ShopHub{" "}
            <span className='bg-gradient-primary bg-clip-text text-transparent'>
              Products
            </span>
          </h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Explore our curated collection of premium products designed to
            enhance your lifestyle
          </p>
        </div>

        {/* Search and Filters */}
        <div className='flex flex-col lg:flex-row gap-4 mb-8'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5' />
              <Input
                type='text'
                placeholder='Search products...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 h-12 text-lg'
              />
            </div>
          </div>

          <div className='flex gap-2'>
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth'
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className='flex border border-input rounded-lg overflow-hidden'>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size='icon'
                onClick={() => setViewMode("grid")}
                className='rounded-none'
              >
                <Grid className='h-4 w-4' />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size='icon'
                onClick={() => setViewMode("list")}
                className='rounded-none'
              >
                <List className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className='flex justify-between items-center mb-6'>
          <p className='text-muted-foreground'>
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <Button variant='outline' className='hidden sm:flex'>
            <Filter className='h-4 w-4 mr-2' />
            More Filters
          </Button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <h3 className='text-2xl font-semibold mb-4'>No products found</h3>
            <p className='text-muted-foreground mb-6'>
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
