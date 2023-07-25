export type ISiteSettings = {
  accentColor: IColor;
  _id: string;
  title: string;
  description: string;
  logo: ISanityImage;
  textColor: IColor;
  bgColor: IColor;
};

export type IColor = {
  alpha: number;
  hex: string;
};

export type ISpacer = {
  _key: string;
  Size: 'small' | 'medium' | 'large';
};

export type IPage = {
  _id: string;
  _rev: string;
  _type: 'page';
  name: string;
  menuOrder?: number;
  content?: IHeadingAndTitle[] | IHero[] | IGrid[] | IUiElement[] | IPerson[] | IService[];
};

export type IService = {
  _key: string;
  _id: string;
  _type: 'service';
  title: string;
  slug: ISlug;
  description: string;
  price: number;
  duration: number;
  mainImage: ISanityImage;
};

export type IPrice = {
  _key: string;
  _id: string;
  _type: 'price';
  service: IService [];
};

export type ICallToAction = {
  _key: any;
  _id: string;
  _type: string;
  callToAction: string;
  navigateToPage?: string;
  navigateToUrl?: string;
  linkType: string;
  buttonContent: string;
  image?: ISanityImage;
  backgroundColor?: string;
  textColor?: string;
  customColor?: boolean;
  chosenCustomColor?: IColor;
  border?: boolean;
  borderColor: string;
};

export type IUiElement = {
  _key: string;
  _type: 'uiElement';
  style: 'wave';
};

export type ISanityImage = {
  _key: string;
  _id: string;
  url: any;
  _type: string;
  asset: {
    url(url: any): unknown;
    _ref: string;
    _type: string;
  };
};

export type ICustomButton = {
  _id: string;
  _key: string;
  buttons: ICallToAction[];
};

export type IHero = {
  _id: string;
  _key: string;
  _type: string;
  blockContent?: any;
  image?: ISanityImage;
  buttons?: ICallToAction[];
  layout:
    | 'image-bg-center'
    | 'simple-image-right'
  opacity?: number;
  heroTextColor?: IColor;
  heroBgColor?: IColor;
};

export type ICard = {
  _id: string;
  _key: string;
  _type: string;
  blockContent: any;
  image?: ISanityImage;
  buttons?: ICallToAction[];
  layout: 'image-top-rounded-full';
};


export type IGrid = {
  _id: string;
  _key: string;
  title: string;
  columns: IColumns;
  items: ICard[];
};

export type IColumns = {
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
};

export type IHeadingAndTitle = {
  _id: string;
  _type: string;
  _key: string;
  blockContent: any;
  style: 'centered';
};

export type IPost = {
  _type: string;
  _key: string;
  title: string;
  slug: ISlug;
  person: IPerson;
  mainImage: ISanityImage;
  categories: ICategory[];
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  blockContent?: any;
};

export type IPerson = {
  _id: string;
  _type: 'person';
  name: string;
  role: string;
  image: ISanityImage;
  number?: string;
  email?: string;
};

export type ICategory = {
  _key: string;
  _ref: string;
  _id: string;
  _type: 'category';
  name: string;
  description?: string;
};

export type IReference = {
  _id: string;
  _ref: string;
  _type: 'post';
};

export type ISlug = {
  current: string;
};
