import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { phones } from '@/data/phones';
import { Search, Filter, X } from 'lucide-react';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [priceRange, setPriceRange] = useState<string>('all');

  // Get filter from URL params
  const urlFilter = searchParams.get('filter');

  const filteredAndSortedPhones = useMemo(() => {
    let filtered = phones.filter(phone => phone.inStock);

    // Apply URL filter
    if (urlFilter === 'bestseller') {
      filtered = filtered.filter(phone => phone.isBestSeller);
    } else if (urlFilter === 'new') {
      filtered = filtered.filter(phone => phone.isNew);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(phone =>
        phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(phone => phone.brand === selectedBrand);
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-500':
          filtered = filtered.filter(phone => phone.price < 500);
          break;
        case '500-1000':
          filtered = filtered.filter(phone => phone.price >= 500 && phone.price < 1000);
          break;
        case '1000-1500':
          filtered = filtered.filter(phone => phone.price >= 1000 && phone.price < 1500);
          break;
        case 'over-1500':
          filtered = filtered.filter(phone => phone.price >= 1500);
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchTerm, selectedBrand, sortBy, priceRange, urlFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('all');
    setSortBy('name');
    setPriceRange('all');
    setSearchParams({});
  };

  const hasActiveFilters = searchTerm || selectedBrand !== 'all' || priceRange !== 'all' || urlFilter;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {urlFilter === 'bestseller' ? 'Best Sellers' : 
             urlFilter === 'new' ? 'New Arrivals' : 
             'Бүх бүтээгдэхүүн'}
          </h1>
          <p className="text-muted-foreground">
        Дээд зэрэглэлийн ухаалаг гар утасны бүрэн цуглуулгатай танилцаарай
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-card">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-semibold">Filters</h2>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search phones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Brand Filter */}
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүх брэндүүд</SelectItem>
                <SelectItem value="Apple">Apple</SelectItem>
                <SelectItem value="Samsung">Samsung</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-500">Under $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
                <SelectItem value="over-1500">Over $1,500</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* Results Count */}
            <div className="flex items-center justify-center lg:justify-start">
              <Badge variant="secondary" className="text-sm">
                {filteredAndSortedPhones.length} products
              </Badge>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedPhones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedPhones.map((phone) => (
              <ProductCard key={phone.id} phone={phone} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Бүтээгдэхүүн олдсонгүй</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;