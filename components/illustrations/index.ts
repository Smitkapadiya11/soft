// Barrel export for all Silk Room SVG illustration components.
// Importing from "@/components/illustrations" enables clean imports
// while keeping the modules separate for effective tree-shaking.

export { default as HeroIllustration } from "./HeroIllustration";
export type { HeroIllustrationProps } from "./HeroIllustration";

export { default as ProductPack } from "./ProductPack";
export type { ProductPackProps, ProductVariant, ProductView } from "./ProductPack";

export { default as BrandMark } from "./BrandMark";
export type { BrandMarkProps } from "./BrandMark";

export {
  DiscreetPackageIcon,
  DeliveryIcon,
  SecurePaymentIcon,
  SealedProductIcon,
  ReturnPolicyIcon,
  CouplesIcon,
} from "./TrustIcons";
export type { TrustIconProps } from "./TrustIcons";

export { default as AgeGateIllustration } from "./AgeGateIllustration";
export type { AgeGateIllustrationProps } from "./AgeGateIllustration";

export { default as SuccessIllustration } from "./SuccessIllustration";
export type { SuccessIllustrationProps } from "./SuccessIllustration";

export { default as StoryIllustration } from "./StoryIllustration";
export type { StoryIllustrationProps } from "./StoryIllustration";

export {
  BrowseStepIcon,
  OrderStepIcon,
  DeliveryStepIcon,
} from "./HowItWorksIllustrations";
export type { HowItWorksIconProps } from "./HowItWorksIllustrations";

export { default as ComparisonIllustration } from "./ComparisonIllustration";
export type { ComparisonIllustrationProps } from "./ComparisonIllustration";

export {
  DermatologicallyTestedBadge,
  ISOCompliantBadge,
  LatexQualityBadge,
  MadeInIndiaBadge,
} from "./QualityBadges";
export type { QualityBadgeProps } from "./QualityBadges";
