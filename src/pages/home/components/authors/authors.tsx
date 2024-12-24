import React from "react";
import { AuthorProps } from "@/data";
import { Link } from "react-router-dom";
import useCurrentLang from "@/i18n/currentLang";
import { MAIN_PATH } from "@/routes/root-layout/index.enum";
const Author: React.FC<AuthorProps> = ({ authors }) => {
  const lang = useCurrentLang();
  return (
    <div className="bg-neutral-500 p-5 rounded-xl">
      <h2>Authors List:</h2>
      <ul className="flex flex-col gap-3">
        {authors.map((author, index) => (
          <Link to={`/${lang}/${MAIN_PATH.AUTHOR}/${author.id}`} key={index}>
            <li className="cursor-pointer hover:underline">{author.author}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Author;
