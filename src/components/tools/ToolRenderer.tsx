
import React from 'react';
import Calculator from './Calculator';
import UnitConverter from './UnitConverter';
import DateCalculator from './DateCalculator';
import QrGenerator from './QrGenerator';
import JsonFormatter from './JsonFormatter';
import Base64Encoder from './Base64Encoder';
import PasswordGenerator from './PasswordGenerator';
import ImageCompressor from './ImageCompressor';
import UrlEncoder from './UrlEncoder';
import MarkdownEditor from './MarkdownEditor';
import ColorPicker from './ColorPicker';
import TextCaseConverter from './TextCaseConverter';
import CsvViewer from './CsvViewer';
import TextDiff from './TextDiff';
import RegexTester from './RegexTester';
import HashGenerator from './HashGenerator';
import CharacterCounter from './CharacterCounter';
import RandomGenerator from './RandomGenerator';
import PercentageCalculator from './PercentageCalculator';
import LoanCalculator from './LoanCalculator';
import CurrencyConverter from './CurrencyConverter';
import ImageResizer from './ImageResizer';
import ImageCropper from './ImageCropper';
import CodeBeautifier from './CodeBeautifier';
import HtmlEntityEncoder from './HtmlEntityEncoder';
import PalindromeChecker from './PalindromeChecker';
import TimeZoneConverter from './TimeZoneConverter';
import BinaryConverter from './BinaryConverter';
import IpLookup from './IpLookup';
import BmiCalculator from './BmiCalculator';
import WordCounter from './WordCounter';
import ImageToBase64 from './ImageToBase64';
import AspectRatioCalculator from './AspectRatioCalculator';
import JsonToCsv from './JsonToCsv';
import LoremIpsumGenerator from './LoremIpsumGenerator';
import CssMinifier from './CssMinifier';
import JsMinifier from './JsMinifier';
import YamlToJson from './YamlToJson';
import JsonToYaml from './JsonToYaml';
import CsvToJson from './CsvToJson';
import UuidGenerator from './UuidGenerator';
import ChecksumCalculator from './ChecksumCalculator';
import CronParser from './CronParser';
import SqlFormatter from './SqlFormatter';
import JwtDecoder from './JwtDecoder';
import ImageColorPicker from './ImageColorPicker';
import SvgOptimizer from './SvgOptimizer';
import AiTextGenerator from './AiTextGenerator';
import BarcodeGenerator from './BarcodeGenerator';
import PdfMerger from './PdfMerger';
import PdfSplitter from './PdfSplitter';
import PdfCompressor from './PdfCompressor';
import PdfToImage from './PdfToImage';
import PdfTextExtractor from './PdfTextExtractor';
import InvoiceGenerator from './InvoiceGenerator';
import ExpenseCalculator from './ExpenseCalculator';
import ProfitMarginCalculator from './ProfitMarginCalculator';
import BusinessNameGenerator from './BusinessNameGenerator';
import RoiCalculator from './RoiCalculator';
import NotImplemented from './NotImplemented';

interface ToolRendererProps {
  toolId: string;
}

// This component renders the appropriate tool based on the tool ID
const ToolRenderer: React.FC<ToolRendererProps> = ({ toolId }) => {
  // Map of tool IDs to their corresponding components
  const toolComponents: Record<string, React.ComponentType> = {
    'calculator': Calculator,
    'unit-converter': UnitConverter,
    'date-calculator': DateCalculator,
    'qr-generator': QrGenerator,
    'json-formatter': JsonFormatter,
    'base64-encoder': Base64Encoder,
    'password-generator': PasswordGenerator,
    'image-compressor': ImageCompressor,
    'url-encoder': UrlEncoder,
    'markdown-editor': MarkdownEditor,
    'color-picker': ColorPicker,
    'text-case-converter': TextCaseConverter,
    'csv-viewer': CsvViewer,
    'text-diff': TextDiff,
    'regex-tester': RegexTester,
    'hash-generator': HashGenerator,
    'character-counter': CharacterCounter,
    'random-generator': RandomGenerator,
    'percentage-calculator': PercentageCalculator,
    'loan-calculator': LoanCalculator,
    'currency-converter': CurrencyConverter,
    'image-resizer': ImageResizer,
    'image-cropper': ImageCropper,
    'code-beautifier': CodeBeautifier,
    'html-entity-encoder': HtmlEntityEncoder,
    'palindrome-checker': PalindromeChecker,
    'time-zone-converter': TimeZoneConverter,
    'binary-converter': BinaryConverter,
    'ip-lookup': IpLookup,
    'bmi-calculator': BmiCalculator,
    'word-counter': WordCounter,
    'image-to-base64': ImageToBase64,
    'aspect-ratio-calculator': AspectRatioCalculator,
    'json-to-csv': JsonToCsv,
    'lorem-ipsum-generator': LoremIpsumGenerator,
    'css-minifier': CssMinifier,
    'js-minifier': JsMinifier,
    'yaml-to-json': YamlToJson,
    'json-to-yaml': JsonToYaml,
    'csv-to-json': CsvToJson,
    'uuid-generator': UuidGenerator,
    'checksum-calculator': ChecksumCalculator,
    'cron-parser': CronParser,
    'sql-formatter': SqlFormatter,
    'jwt-decoder': JwtDecoder,
    'image-color-picker': ImageColorPicker,
    'svg-optimizer': SvgOptimizer,
    'ai-text-generator': AiTextGenerator,
    'barcode-generator': BarcodeGenerator,
    'pdf-merger': PdfMerger,
    'pdf-splitter': PdfSplitter,
    'pdf-compressor': PdfCompressor,
    'pdf-to-image': PdfToImage,
    'pdf-text-extractor': PdfTextExtractor,
    'invoice-generator': InvoiceGenerator,
    'expense-calculator': ExpenseCalculator,
    'profit-margin-calculator': ProfitMarginCalculator,
    'business-name-generator': BusinessNameGenerator,
    'roi-calculator': RoiCalculator,
  };

  // Get the component for the specified tool ID
  const ToolComponent = toolComponents[toolId] || NotImplemented;
  
  return <ToolComponent />;
};

export default ToolRenderer;
