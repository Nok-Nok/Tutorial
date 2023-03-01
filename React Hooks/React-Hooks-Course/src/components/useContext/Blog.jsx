import React, { useContext } from 'react';
import LocaleContext from './LocaleContext';

const posts = {
  en: [
    'The 46 Most Confusing Corporations From "Forrest Gump',
    'The 22 Best Gifts In South America',
    '45 Swimmers Who Absolutely Nailed It In 2013',
    'The 18 Most Beloved Husky Puppies In The World',
    '34 NFL Linebackers Who Had A Worse Year Than You',
    'The 24 Most Inspirational Things From Christmas Songs',
  ],
  es: [
    'Las 46 corporaciones mÃ¡s confusas de "Forrest Gump',
    'Los 22 mejores regalos en AmÃ©rica del Sur',
    '45 nadadores que absolutamente lo clavaron en 2013',
    'Los 18 cachorros husky mÃ¡s queridos del mundo',
    '34 apoyadores de la NFL que tuvieron un peor aÃ±o que tÃº',
    'Las 24 cosas mÃ¡s inspiradoras de las canciones navideÃ±as',
  ],
};

function Posts({ locale }) {
  return (
    <ul className="posts">
      {posts[locale].map((title) => (
        <li key={title}>
          <h3>{title}</h3>
        </li>
      ))}
    </ul>
  );
}

export default function Blog() {
  const { locale } = useContext(LocaleContext);
  return (
    <div>
      <h1>Blog</h1>
      <Posts locale={locale} />
    </div>
  );
}
