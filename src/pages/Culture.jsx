import PageIntro from '../components/PageIntro';
import StatusMessage from '../components/StatusMessage';
import useFetch from '../hooks/useFetch';
import { getArticles } from '../services/contentService';
import { images } from '../services/mockData';
import styles from './Catalog.module.css';

export default function Culture() {
  const { data, loading, error } = useFetch(getArticles);

  return (
    <>
      <PageIntro title="Cultura del café" image={images.montana}>
        De una leyenda etíope a las montañas de Colombia: la historia de la bebida más compartida del mundo.
      </PageIntro>
      <div className="container">
        {loading && <StatusMessage />}
        {error && (
          <StatusMessage type="error" title="No pudimos cargar los artículos.">
            Revisa tu conexión y recarga la página.
          </StatusMessage>
        )}
        {data && (
          <div className={styles.culture}>
            <nav className={styles.toc} aria-label="Temas">
              {data.map((article) => (
                <a key={article.id} href={`#${article.slug}`}>{article.topic}</a>
              ))}
            </nav>
            <div className={styles.articles}>
              {data.map((article) => (
                <article key={article.id} id={article.slug} className={styles.article}>
                  <img src={article.image} alt="" loading="lazy" />
                  <div>
                    <p className={styles.topic}>{article.topic}</p>
                    <h2>{article.title}</h2>
                    <p>{article.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
