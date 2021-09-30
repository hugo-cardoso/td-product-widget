export type VariantMetafields = Array<{
  id: string;
  title: string;
  values: {
    busto?: number;
    cintura?: number;
    quadril?: number;
    comprimento?: number;
  };
}>
export type Image = {
  aspect_ratio: number;
  height: number;
  width: number;
  src: string;
}

export type Media = {
  id: string;
  alt: string | null;
  position: number;
  asptect_ratio: number;
  width: number;
  height: number;
  media_type: 'image' | 'video';
  src: string;
  preview_image: Image;
}

export type Option = {
  name: string;
  position: number;
  values: Array<string>;
}

export type Variant = {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: string | null;
  available: boolean;
  name: string;
  public_title: string;
  options: string[];
  price: number;
  weight: number;
  compare_at_price: number | null;
  inventory_management: string | null;
  barcode: string;
}

export type Product = {
  id: number;
  title: string;
  handle: string;
  description: string;
  published_at: string;
  created_at: string;
  vendor: string;
  type: string;
  tags: string[];
  price: number;
  price_min: number;
  price_max: number;
  available: boolean;
  price_varies: boolean;
  compare_at_price: number | null;
  compare_at_price_min: number | null;
  compare_at_price_max: number | null;
  compare_at_price_varies: boolean;
  variants: Variant[];
  images: string[];
  featured_image: string;
  options: Option[];
  url: string;
  media: Media[];
}