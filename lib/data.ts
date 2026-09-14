// ─── Types ───────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  image: string;
  badge?: string; // "Bestseller", "New", "Seasonal"
  inStock: boolean;
  customizations?: {
    label: string;
    options: string[];
  }[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}



export interface OrderItem {
  product: Product;
  quantity: number;
  customizations?: Record<string, string>;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  customerName: string;
  phone: string;
  address: string;
  pincode: string;
  deliveryDate: string;
  giftNote?: string;
  total: number;
  createdAt: string;
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "making"
  | "out-for-delivery"
  | "delivered";

// ─── Categories ──────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    id: "cookie-tins",
    name: "Cookie Tins",
    description: "Handcrafted assorted cookies in premium decorative tins",
    image: "/products/cookie-tin.jpg",
  },
  {
    id: "brownie-tubs",
    name: "Brownie Tubs",
    description: "Rich, fudgy brownies layered in indulgent tubs",
    image: "/products/nutella-brownie.jpg",
  },
  {
    id: "kunafa",
    name: "Kunafa",
    description: "Golden crispy kunafa cookies with creamy fillings",
    image: "/products/kunafa-cookies.jpg",
  },
  {
    id: "cakes",
    name: "Cakes",
    description: "Showstopping cakes for every celebration",
    image: "/products/chocolate-cake.jpg",
  },
  {
    id: "hampers",
    name: "Gift Hampers",
    description: "Curated dessert gift boxes for every occasion",
    image: "/products/rakhi-hamper.jpg",
  },
];

// ─── Products ────────────────────────────────────────────────────────────────

export const products: Product[] = [
  // Cookie Tins
  {
    id: "classic-cookie-tin",
    name: "Classic Cookie Tin",
    description:
      "An assortment of our finest handmade cookies: chocolate chip, almond biscotti, butter swirls, and hazelnut clusters.",
    longDescription:
      "Our signature cookie tin is a celebration of flavours and textures. Each tin is filled with a hand-curated assortment of our finest cookies: gooey chocolate chip cookies with premium Belgian chocolate, crunchy almond biscotti twice-baked to perfection, delicate butter swirls that melt in your mouth, and rich hazelnut clusters drizzled with dark chocolate. Every cookie is baked fresh in small batches and packed with love in our iconic golden tin.",
    price: 799,
    category: "cookie-tins",
    image: "/products/cookie-tin.jpg",
    badge: "Bestseller",
    inStock: true,
    customizations: [
      {
        label: "Size",
        options: ["Regular (250g)", "Large (500g)", "Family (1kg)"],
      },
    ],
  },
  {
    id: "choco-lovers-tin",
    name: "Choco Lover's Tin",
    description:
      "For the chocolate obsessed: double chocolate, chocolate almond, dark chocolate & sea salt cookies.",
    longDescription:
      "A paradise for chocolate lovers. This tin is packed exclusively with chocolate-forward cookies: sinfully rich double chocolate cookies, crunchy chocolate almond cookies with roasted almonds, and our crowd-favourite dark chocolate & sea salt cookies. Made with premium Belgian chocolate and the finest cocoa powder, each cookie is a chocolate dream come true.",
    price: 899,
    category: "cookie-tins",
    image: "/products/cookie-tin.jpg",
    inStock: true,
    customizations: [
      {
        label: "Size",
        options: ["Regular (250g)", "Large (500g)"],
      },
    ],
  },

  // Brownie Tubs
  {
    id: "nutella-brownie-tub",
    name: "Nutella Brownie Tub",
    description:
      "Dense, fudgy brownies loaded with Nutella swirls, chocolate chips, and crushed hazelnuts.",
    longDescription:
      "Our most indulgent creation. Dense, fudgy brownies are baked with generous swirls of Nutella running through every layer. Topped with dark chocolate chips and crushed roasted hazelnuts for that perfect crunch. Each tub is packed while warm so the Nutella stays gooey and irresistible. Best enjoyed slightly warmed — microwave for 15 seconds for the ultimate experience.",
    price: 599,
    category: "brownie-tubs",
    image: "/products/nutella-brownie.jpg",
    badge: "Bestseller",
    inStock: true,
    customizations: [
      {
        label: "Size",
        options: ["Small (200g)", "Regular (400g)", "Large (600g)"],
      },
      {
        label: "Add-ons",
        options: ["None", "Extra Hazelnuts (+₹50)", "Extra Nutella (+₹75)"],
      },
    ],
  },
  {
    id: "biscoff-brownie-tub",
    name: "Biscoff Brownie Tub",
    description:
      "Caramelized brownies with a thick layer of Biscoff spread and crushed Biscoff cookies.",
    longDescription:
      "A marriage of rich chocolate brownies and the beloved Biscoff flavour. Our fudgy brownie base is layered with a generous spread of Lotus Biscoff cookie butter, then topped with crushed Biscoff cookies for an addictive crunch. The caramelized, spiced notes of Biscoff complement the deep chocolate flavour perfectly. A fan favourite that sells out fast.",
    price: 649,
    category: "brownie-tubs",
    image: "/products/biscoff-brownie.jpg",
    badge: "New",
    inStock: true,
    customizations: [
      {
        label: "Size",
        options: ["Small (200g)", "Regular (400g)", "Large (600g)"],
      },
    ],
  },

  // Kunafa
  {
    id: "pistachio-kunafa-cookies",
    name: "Pistachio Kunafa Cookies",
    description:
      "Golden crispy kataifi pastry cookies filled with cream cheese and topped with crushed pistachios.",
    longDescription:
      "Inspired by the beloved Middle Eastern dessert, our kunafa cookies feature hand-shredded kataifi pastry wrapped around a luscious cream cheese filling. Each cookie is baked until golden and crispy, then topped with crushed pistachios and a light drizzle of rose sugar syrup. Served warm, they offer the perfect combination of crunch, creaminess, and nutty sweetness. A sweet.bonanza original that has become an instant hit.",
    price: 499,
    category: "kunafa",
    image: "/products/kunafa-cookies.jpg",
    badge: "Bestseller",
    inStock: true,
    customizations: [
      {
        label: "Quantity",
        options: ["Box of 6", "Box of 12", "Box of 24"],
      },
    ],
  },
  {
    id: "nutella-kunafa",
    name: "Nutella Kunafa Cups",
    description:
      "Mini kunafa cups filled with warm Nutella and topped with hazelnuts. Best served warm!",
    longDescription:
      "Our modern twist on kunafa. Crunchy kataifi pastry cups filled with warm, gooey Nutella and topped with roasted hazelnuts and a dusting of powdered sugar. These individual-sized cups make the perfect party treat or indulgent personal dessert. Reheat for 10 seconds in the microwave to enjoy that fresh-from-the-oven experience.",
    price: 549,
    category: "kunafa",
    image: "/products/kunafa-cookies.jpg",
    inStock: true,
    customizations: [
      {
        label: "Quantity",
        options: ["Box of 6", "Box of 12"],
      },
    ],
  },

  // Cakes
  {
    id: "belgian-chocolate-cake",
    name: "Belgian Chocolate Cake",
    description:
      "Three layers of rich chocolate sponge with dark chocolate ganache, chocolate shards, and fresh berries.",
    longDescription:
      "Our showstopper cake. Three layers of moist, rich chocolate sponge made with premium Belgian couverture chocolate, layered with a silky dark chocolate ganache. Finished with dramatic chocolate shards, fresh seasonal berries, and edible gold leaf. This cake is as much a visual masterpiece as it is a taste sensation. Perfect for birthdays, anniversaries, or any celebration worth remembering.",
    price: 1499,
    category: "cakes",
    image: "/products/chocolate-cake.jpg",
    inStock: true,
    customizations: [
      {
        label: "Size",
        options: ['6" (serves 6-8)', '8" (serves 10-12)', '10" (serves 16-20)'],
      },
      {
        label: "Message",
        options: [
          "No message",
          "Happy Birthday",
          "Happy Anniversary",
          "Congratulations",
          "Custom (add in notes)",
        ],
      },
    ],
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    description:
      "Classic red velvet with cream cheese frosting, white chocolate drip, and fresh rose petals.",
    longDescription:
      "A classic that never goes out of style. Our red velvet cake features layers of tender, cocoa-kissed red velvet sponge paired with our signature tangy cream cheese frosting. Finished with an elegant white chocolate drip, fresh rose petals, and a dusting of red velvet crumbs. The perfect balance of richness and lightness that makes red velvet eternally beloved.",
    price: 1399,
    category: "cakes",
    image: "/products/chocolate-cake.jpg",
    inStock: true,
    customizations: [
      {
        label: "Size",
        options: ['6" (serves 6-8)', '8" (serves 10-12)'],
      },
    ],
  },

  // Hampers
  {
    id: "rakhi-special-hamper",
    name: "Rakhi Special Hamper",
    description:
      "A festive gift box with assorted cookies, brownie tub, chocolate truffles, dry fruits, and a rakhi.",
    longDescription:
      "Make this Rakhi extra sweet with our curated festive hamper. This premium gift box includes our signature cookie tin, a Nutella brownie tub, handmade chocolate truffles, premium dry fruits, all beautifully arranged in a golden gift box with satin ribbon and a gorgeous rakhi. Perfect for showing your sibling just how special they are. Each hamper is assembled with care and can include a personalised note.",
    price: 1999,
    category: "hampers",
    image: "/products/rakhi-hamper.jpg",
    badge: "Seasonal",
    inStock: true,
    customizations: [
      {
        label: "Hamper Size",
        options: ["Classic", "Premium (+₹500)", "Grand (+₹1000)"],
      },
    ],
  },
  {
    id: "celebration-hamper",
    name: "Celebration Hamper",
    description:
      "The ultimate dessert gift box, perfect for birthdays, anniversaries, and corporate gifting.",
    longDescription:
      "Our all-occasion celebration hamper is the go-to gift for any milestone. Packed with a curated selection of our bestsellers (cookie tin, brownie tub, kunafa cookies, and chocolate truffles) all presented in a premium gift box. Available in three sizes to match every budget and occasion. Add a personalised note to make it extra special. Bulk pricing available for corporate orders of 10+.",
    price: 2499,
    category: "hampers",
    image: "/products/rakhi-hamper.jpg",
    inStock: true,
    customizations: [
      {
        label: "Hamper Size",
        options: ["Standard", "Deluxe (+₹700)", "Royal (+₹1500)"],
      },
    ],
  },
];


// ─── Valid Delivery Pincodes (Surat area) ────────────────────────────────────

export const validPincodes = [
  "395001", "395002", "395003", "395004", "395005",
  "395006", "395007", "395008", "395009", "395010",
  "395017", "395023",
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategories(): Category[] {
  return categories;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.badge === "Bestseller");
}



export function isValidPincode(pincode: string): boolean {
  return validPincodes.includes(pincode);
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

export function generateOrderId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "SB-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const orderStatuses: { key: OrderStatus; label: string }[] = [
  { key: "placed", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "making", label: "Being Made" },
  { key: "out-for-delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];
