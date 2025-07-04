import { 
  Calculator, Clock, Calendar, QrCode, Ruler, Compass, 
  FileText, FileImage, FileVideo, FileAudio, Map, Globe, 
  Barcode, CheckSquare, Code, CreditCard, Database, 
  AreaChart, BarChartHorizontal, PieChart, Hash, Rss, 
  Pencil, Scissors, Dices, Palette, RefreshCcw, Shuffle, 
  Percent, DollarSign, Maximize, Minimize, FlipHorizontal, 
  FlipVertical, RotateCcw, RotateCw, Heading1, Heading2, 
  Type, Quote, List, ListOrdered, Binary, BrainCircuit, 
  Cpu, Monitor, Scan, Search, FileJson, Fingerprint, 
  FileDiff, Regex, XCircle, Check, ChevronRight, Trophy,
  File, Briefcase, TrendingUp, Gamepad2, Target,
  Coins, Hand, PiggyBank, Repeat
} from "lucide-react";

export type ToolType = {
  id: string;
  name: string;
  description: string;
  category: ToolCategoryType;
  path: string;
  icon: React.ElementType;
  featured?: boolean;
  new?: boolean;
};

export type ToolCategoryType = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
};

export const categories: ToolCategoryType[] = [
  {
    id: "calculation",
    name: "Calculation",
    description: "Tools for mathematical calculations and conversions",
    icon: Calculator,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    id: "date-time",
    name: "Date & Time",
    description: "Tools for date and time management and calculations",
    icon: Clock,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
  },
  {
    id: "encoding",
    name: "Encoding",
    description: "Tools for encoding and decoding data formats",
    icon: QrCode,
    color: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    id: "measurement",
    name: "Measurement",
    description: "Tools for measuring and converting units",
    icon: Ruler,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
  },
  {
    id: "files",
    name: "File Tools",
    description: "Tools for working with various file formats",
    icon: FileText,
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
  },
  {
    id: "pdf",
    name: "PDF Tools",
    description: "Tools for creating, editing and manipulating PDF files",
    icon: File,
    color: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
  },
  {
    id: "geo",
    name: "Geographic",
    description: "Tools for geography and location-based calculations",
    icon: Map,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
  },
  {
    id: "generators",
    name: "Generators",
    description: "Tools for generating various types of content",
    icon: Dices,
    color: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
  },
  {
    id: "finance",
    name: "Finance",
    description: "Tools for financial calculations and conversions",
    icon: DollarSign,
    color: "bg-lime-50 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400"
  },
  {
    id: "business",
    name: "Business",
    description: "Professional tools for business and enterprise use",
    icon: Briefcase,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    id: "transforms",
    name: "Transformers",
    description: "Tools for transforming data from one format to another",
    icon: RefreshCcw,
    color: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400"
  },
  {
    id: "text",
    name: "Text Tools",
    description: "Tools for manipulating and analyzing text",
    icon: Type,
    color: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400"
  },
  {
    id: "development",
    name: "Development",
    description: "Tools for software developers and programmers",
    icon: Code,
    color: "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400"
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Tools for data analysis and visualization",
    icon: AreaChart,
    color: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
  },
  {
    id: "games",
    name: "Game Tools",
    description: "Fun tools for games and entertainment",
    icon: Gamepad2,
    color: "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
  },
];

export const tools: ToolType[] = [
  {
    id: "calculator",
    name: "Calculator",
    description: "A versatile calculator with scientific functions",
    category: categories.find(c => c.id === "calculation")!,
    path: "/tools/calculator",
    icon: Calculator,
    featured: true
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    category: categories.find(c => c.id === "measurement")!,
    path: "/tools/unit-converter",
    icon: Compass,
    featured: true
  },
  {
    id: "date-calculator",
    name: "Date Calculator",
    description: "Calculate days between dates or add/subtract days",
    category: categories.find(c => c.id === "date-time")!,
    path: "/tools/date-calculator",
    icon: Calendar,
    featured: true
  },
  {
    id: "qr-generator",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs",
    category: categories.find(c => c.id === "encoding")!,
    path: "/tools/qr-generator",
    icon: QrCode,
    featured: true
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode or decode Base64 data",
    category: categories.find(c => c.id === "encoding")!,
    path: "/tools/base64-encoder",
    icon: RefreshCcw
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode or decode URL components",
    category: categories.find(c => c.id === "encoding")!,
    path: "/tools/url-encoder",
    icon: Globe
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format and validate JSON data",
    category: categories.find(c => c.id === "development")!,
    path: "/tools/json-formatter",
    icon: FileJson,
    featured: true
  },
  {
    id: "markdown-editor",
    name: "Markdown Editor",
    description: "Live markdown editor with preview",
    category: categories.find(c => c.id === "text")!,
    path: "/tools/markdown-editor",
    icon: FileText
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress images to reduce file size",
    category: categories.find(c => c.id === "files")!,
    path: "/tools/image-compressor",
    icon: FileImage
  },
  {
    id: "csv-viewer",
    name: "CSV Viewer",
    description: "View and analyze CSV files",
    category: categories.find(c => c.id === "files")!,
    path: "/tools/csv-viewer",
    icon: Database
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate secure random passwords",
    category: categories.find(c => c.id === "generators")!,
    path: "/tools/password-generator",
    icon: Fingerprint
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Pick and convert colors in different formats",
    category: categories.find(c => c.id === "development")!,
    path: "/tools/color-picker",
    icon: Palette
  },
  {
    id: "text-diff",
    name: "Text Diff",
    description: "Compare two texts and find differences",
    category: categories.find(c => c.id === "text")!,
    path: "/tools/text-diff",
    icon: FileDiff
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions",
    category: categories.find(c => c.id === "development")!,
    path: "/tools/regex-tester",
    icon: Regex
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate hash values for text or files",
    category: categories.find(c => c.id === "encoding")!,
    path: "/tools/hash-generator",
    icon: Hash
  },
  {
    id: "character-counter",
    name: "Character Counter",
    description: "Count characters, words, and lines in text",
    category: categories.find(c => c.id === "text")!,
    path: "/tools/character-counter",
    icon: Hash
  },
  {
    id: "random-generator",
    name: "Random Generator",
    description: "Generate random numbers, strings, and more",
    category: categories.find(c => c.id === "generators")!,
    path: "/tools/random-generator",
    icon: Shuffle
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages easily",
    category: categories.find(c => c.id === "calculation")!,
    path: "/tools/percentage-calculator",
    icon: Percent
  },
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate loan payments and interest",
    category: categories.find(c => c.id === "finance")!,
    path: "/tools/loan-calculator",
    icon: CreditCard
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert between different currencies",
    category: categories.find(c => c.id === "finance")!,
    path: "/tools/currency-converter",
    icon: DollarSign
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to specific dimensions",
    category: categories.find(c => c.id === "files")!,
    path: "/tools/image-resizer",
    icon: Maximize
  },
  {
    id: "image-cropper",
    name: "Image Cropper",
    description: "Crop images to specific dimensions",
    category: categories.find(c => c.id === "files")!,
    path: "/tools/image-cropper",
    icon: Scissors
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text between different cases",
    category: categories.find(c => c.id === "text")!,
    path: "/tools/text-case-converter",
    icon: Type
  },
  {
    id: "code-beautifier",
    name: "Code Beautifier",
    description: "Format and beautify code",
    category: categories.find(c => c.id === "development")!,
    path: "/tools/code-beautifier",
    icon: Code
  },
  {
    id: "html-entity-encoder",
    name: "HTML Entity Encoder",
    description: "Encode or decode HTML entities",
    category: categories.find(c => c.id === "development")!,
    path: "/tools/html-entity-encoder",
    icon: Code
  },
  {
    id: "palindrome-checker",
    name: "Palindrome Checker",
    description: "Check if text is a palindrome",
    category: categories.find(c => c.id === "text")!,
    path: "/tools/palindrome-checker",
    icon: RefreshCcw
  },
  {
    id: "time-zone-converter",
    name: "Time Zone Converter",
    description: "Convert times across different time zones",
    category: categories.find(c => c.id === "date-time")!,
    path: "/tools/time-zone-converter",
    icon: Globe
  },
  {
    id: "binary-converter",
    name: "Binary Converter",
    description: "Convert between binary, decimal, and hex",
    category: categories.find(c => c.id === "encoding")!,
    path: "/tools/binary-converter",
    icon: Binary
  },
  {
    id: "ip-lookup",
    name: "IP Lookup",
    description: "Look up information about an IP address",
    category: categories.find(c => c.id === "geo")!,
    path: "/tools/ip-lookup",
    icon: Search
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index",
    category: categories.find(c => c.id === "calculation")!,
    path: "/tools/bmi-calculator",
    icon: Calculator
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words in text",
    category: categories.find(c => c.id === "text")!,
    path: "/tools/word-counter",
    icon: Hash
  },
  {
    id: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    description: "Calculate and maintain aspect ratios",
    category: categories.find(c => c.id === "calculation")!,
    path: "/tools/aspect-ratio-calculator",
    icon: Maximize
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate lorem ipsum placeholder text",
    category: categories.find(c => c.id === "generators")!,
    path: "/tools/lorem-ipsum-generator",
    icon: Type
  },
  {
    id: "css-minifier",
    name: "CSS Minifier",
    description: "Minify CSS code",
    category: categories.find(c => c.id === "development")!,
    path: "/tools/css-minifier",
    icon: Code
  },
  {
    id: "js-minifier",
    name: "JavaScript Minifier",
    description: "Minify JavaScript code",
    category: categories.find(c => c.id === "development")!,
    path: "/tools/js-minifier",
    icon: Code
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate UUIDs/GUIDs",
    category: categories.find(c => c.id === "generators")!,
    path: "/tools/uuid-generator",
    icon: Hash,
    new: true
  },
  {
    id: "checksum-calculator",
    name: "Checksum Calculator",
    description: "Calculate checksums for files",
    category: categories.find(c => c.id === "encoding")!,
    path: "/tools/checksum-calculator",
    icon: CheckSquare
  },
  {
    id: "cron-parser",
    name: "Cron Expression Parser",
    description: "Parse and explain cron expressions",
    category: categories.find(c => c.id === "development")!,
    path: "/tools/cron-parser",
    icon: Clock
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Format SQL queries",
    category: categories.find(c => c.id === "development")!,
    path: "/tools/sql-formatter",
    icon: Database
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode JWT tokens",
    category: categories.find(c => c.id === "development")!,
    path: "/tools/jwt-decoder",
    icon: Scan,
    new: true
  },
  {
    id: "image-color-picker",
    name: "Image Color Picker",
    description: "Pick colors from an image",
    category: categories.find(c => c.id === "files")!,
    path: "/tools/image-color-picker",
    icon: Palette
  },
  {
    id: "svg-optimizer",
    name: "SVG Optimizer",
    description: "Optimize SVG files",
    category: categories.find(c => c.id === "files")!,
    path: "/tools/svg-optimizer",
    icon: FileImage
  },
  {
    id: "ai-text-generator",
    name: "AI Text Generator",
    description: "Generate text using AI",
    category: categories.find(c => c.id === "generators")!,
    path: "/tools/ai-text-generator",
    icon: BrainCircuit,
    new: true
  },
  {
    id: "barcode-generator",
    name: "Barcode Generator",
    description: "Generate various types of barcodes",
    category: categories.find(c => c.id === "generators")!,
    path: "/tools/barcode-generator",
    icon: Barcode
  },
  {
    id: "pdf-merger",
    name: "PDF Merger",
    description: "Combine multiple PDF files into one document",
    category: categories.find(c => c.id === "pdf")!,
    path: "/tools/pdf-merger",
    icon: File,
    featured: true,
    new: true
  },
  {
    id: "pdf-splitter",
    name: "PDF Splitter",
    description: "Split PDF files into multiple documents",
    category: categories.find(c => c.id === "pdf")!,
    path: "/tools/pdf-splitter",
    icon: Scissors,
    new: true
  },
  {
    id: "pdf-compressor",
    name: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality",
    category: categories.find(c => c.id === "pdf")!,
    path: "/tools/pdf-compressor",
    icon: Minimize,
    new: true
  },
  {
    id: "pdf-to-image",
    name: "PDF to Image",
    description: "Convert PDF pages to image formats (JPG, PNG)",
    category: categories.find(c => c.id === "pdf")!,
    path: "/tools/pdf-to-image",
    icon: FileImage
  },
  {
    id: "pdf-text-extractor",
    name: "PDF Text Extractor",
    description: "Extract text content from PDF files",
    category: categories.find(c => c.id === "pdf")!,
    path: "/tools/pdf-text-extractor",
    icon: FileText
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    description: "Create professional invoices for your business",
    category: categories.find(c => c.id === "business")!,
    path: "/tools/invoice-generator",
    icon: FileText,
    featured: true,
    new: true
  },
  {
    id: "expense-calculator",
    name: "Expense Calculator",
    description: "Calculate and track business expenses",
    category: categories.find(c => c.id === "business")!,
    path: "/tools/expense-calculator",
    icon: Calculator
  },
  {
    id: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    description: "Calculate profit margins for your products or services",
    category: categories.find(c => c.id === "business")!,
    path: "/tools/profit-margin-calculator",
    icon: Percent
  },
  {
    id: "business-name-generator",
    name: "Business Name Generator",
    description: "Generate creative business name ideas",
    category: categories.find(c => c.id === "business")!,
    path: "/tools/business-name-generator",
    icon: Briefcase
  },
  {
    id: "roi-calculator",
    name: "ROI Calculator",
    description: "Calculate return on investment for business decisions",
    category: categories.find(c => c.id === "business")!,
    path: "/tools/roi-calculator",
    icon: TrendingUp
  },
  {
    id: "dice-roller",
    name: "Dice Roller",
    description: "Roll virtual dice for games, RPGs, or random generation",
    category: categories.find(c => c.id === "games")!,
    path: "/tools/dice-roller",
    icon: Dices,
    featured: true,
    new: true
  },
  {
    id: "rock-paper-scissors",
    name: "Rock Paper Scissors",
    description: "Play the classic game against the computer",
    category: categories.find(c => c.id === "games")!,
    path: "/tools/rock-paper-scissors",
    icon: Hand,
    new: true
  },
  {
    id: "coin-flipper",
    name: "Coin Flipper",
    description: "Flip a virtual coin for decision making or games",
    category: categories.find(c => c.id === "games")!,
    path: "/tools/coin-flipper",
    icon: Coins,
    new: true
  },
  {
    id: "number-guessing-game",
    name: "Number Guessing Game",
    description: "Try to guess the hidden number with feedback",
    category: categories.find(c => c.id === "games")!,
    path: "/tools/number-guessing-game",
    icon: Target,
    new: true
  },
  {
    id: "fixed-deposit-calculator",
    name: "Fixed Deposit Calculator",
    description: "Calculate returns on fixed deposit investments",
    category: categories.find(c => c.id === "finance")!,
    path: "/tools/fixed-deposit-calculator",
    icon: PiggyBank,
    new: true
  },
  {
    id: "recurring-deposit-calculator",
    name: "Recurring Deposit Calculator", 
    description: "Calculate returns on recurring deposit investments",
    category: categories.find(c => c.id === "finance")!,
    path: "/tools/recurring-deposit-calculator",
    icon: Repeat,
    new: true
  },
  {
    id: "mutual-fund-calculator",
    name: "Mutual Fund Calculator",
    description: "Calculate SIP and lump sum mutual fund returns",
    category: categories.find(c => c.id === "finance")!,
    path: "/tools/mutual-fund-calculator",
    icon: AreaChart,
    featured: true,
    new: true
  },
  {
    id: "image-to-base64",
    name: "Image to Base64",
    description: "Convert image to Base64 encoding",
    category: categories.find(c => c.id === "transforms")!,
    path: "/tools/image-to-base64",
    icon: FileImage
  },
  {
    id: "json-to-csv",
    name: "JSON to CSV",
    description: "Convert JSON to CSV format",
    category: categories.find(c => c.id === "transforms")!,
    path: "/tools/json-to-csv",
    icon: FileText,
    featured: true
  },
  {
    id: "csv-to-json",
    name: "CSV to JSON",
    description: "Convert CSV to JSON format",
    category: categories.find(c => c.id === "transforms")!,
    path: "/tools/csv-to-json",
    icon: RefreshCcw
  },
  {
    id: "yaml-to-json",
    name: "YAML to JSON",
    description: "Convert YAML to JSON format",
    category: categories.find(c => c.id === "transforms")!,
    path: "/tools/yaml-to-json",
    icon: RefreshCcw
  },
  {
    id: "json-to-yaml",
    name: "JSON to YAML",
    description: "Convert JSON to YAML format",
    category: categories.find(c => c.id === "transforms")!,
    path: "/tools/json-to-yaml",
    icon: RefreshCcw
  },
];
