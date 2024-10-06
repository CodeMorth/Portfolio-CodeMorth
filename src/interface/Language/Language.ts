export interface PackLanguageType {
  English: DataLanguageType
  Spanish: DataLanguageType
}

export interface DataLanguageType {
  navbarLanguage: NavbarLanguageType[]
  homeLanguage: HomeLanguage
  experienceLanguage: ExperienceLanguage
  projectLanguage: ProjectLanguage
  customLoading:string
  contact: Contact,
  toastData:ToastData
}

export interface ExperienceLanguage {
  title: string
  experienceCardLanguage: ExperienceCardLanguage[]
}

export interface ExperienceCardLanguage {
  title: string
  subtitle: string
  src: string
  alt: string
  description: string
}

export interface HomeLanguage {
  h1: string
  span1: string
  span2: string
  p: string
  urlCV: string
}

export interface NavbarLanguageType {
  text: string
  ref: string
  leftLine: number
  widthLine: number
  rotateLine: number
}

export interface ProjectLanguage {
  title: string
  projectCard: ProjectCardType[]
}

export interface ProjectCardType {
  href:string
  bg_color: string
  border_color: string
  font_color: string
  image: string
  title: string
  filter_shadow: string
  imagesData: ImagesDatum[]
  leftOrigth: 'left' | 'right'
  txtDescription: string
}

export interface ImagesDatum {
  src: string
  filter_shadow: string
}

interface ContactFormErrors {
  invalid?: string;
  required: string;
}

interface ContactForm {
  label: {
    name: keyof FormDataMail;
    email: string;
    message: string;
  };
  placeholder: {
    name: string;
    email: string;
    message: string;
  };
  errors: {
    name: string;
    email: ContactFormErrors;
    message: string;
  };
}

interface Contact {
  title: string;
  form: ContactForm;
  button: string;
}

export interface FormDataMail {
  NAME: string;
  EMAIL: string;
  MESSAGE: string;
};

interface ToastData {
  success: string;
  error404: string;
  errorMessage: string;
  errorReturn: string;
}