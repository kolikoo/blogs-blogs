import bookImg from "!/book (1).png";
import peopleImg from "!/people.png";
import innovate from "!/innovation.png";
import learning from "!/coding.png";

export interface Item {
  title: string;
  author: string;
  description: string;
}
export interface BlogsProps {
  data: Item[];
}
export interface Author {
  id: string;
  author: string;
}

export interface AuthorProps {
  authors: Author[];
}
export type AuthorProp =
  | {
      id: string;
      author: string;
      profession: string;
      professionDescription: string;
      followers: number;
      following: number;
      biography: string;
    }
  | undefined;
export interface AboutDetailProps {
  author: AuthorProp;
}
interface ProfileData {
  avatar_url: string | null;
  id: string;
  name_en: string | null;
  name_ka: string | null;
  phone: string | null;
  surname_en: string | null;
  surname_ka: string | null;
  updated_at: string | null;
  username: string | null;
}
export interface LoginForm {
  email: string;
  password: string;
}
export interface RegisterForm {
  email: string;
  password: string;
  repeatPassword: string;
}
export interface ProfileForm {
  username: string;
  name_ka: string;
  name_en: string;
  surname_ka: string;
  surname_en: string;
  phone: string;
  avatar_url: string;
}
export interface ProfileFormFull extends ProfileForm {
  id: string;
}
export interface MainInfoProps {
  data: ProfileData[] | null | undefined;
}
export interface FilterValue {
  search: string;
}
export const blogsDefaultValues = {
  title_ka: "",
  title_en: "",
  description_ka: "",
  description_en: "",
  image_url: null,
};
export const data = [
  { id: "1", title: "theGreatGatsby" },
  { id: "2", title: "toKillAMockingbird" },
  { id: "3", title: "nineteenEightyFour" },
  { id: "4", title: "prideAndPrejudice" },
  { id: "5", title: "mobyDick" },
];

export const offers = [
  { title: "Rich Content", img: bookImg },
  { title: "Vibrant Community", img: peopleImg },
  { title: "Cutting-edge Topics", img: innovate },
  { title: "Collaborative Learning", img: learning },
];

export const authorDetailed = [
  { id: "1", title: "F. Scott Fitzgerald" },
  { id: "2", title: "Harper Lee" },
  { id: "3", title: "George Orwell" },
  { id: "4", title: "Jane Austen" },
  { id: "5", title: "Herman Melville" },
];
