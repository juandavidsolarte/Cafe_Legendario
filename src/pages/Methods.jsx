import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import StatusMessage from '../components/StatusMessage';
import useFetch from '../hooks/useFetch';
import { getMethods } from '../services/contentService';
import { images } from '../services/mockData';
import styles from './Catalog.module.css';

export default function Methods() {
  const { data, loading, error } = useFetch(getMethods);

  return (
    <>
      <PageIntro title="Métodos de preparación" image={images.chemex}>
        El mismo café sabe distinto según la molienda, el tiempo y la forma de extraerlo.
      </PageIntro>
      <div className="container">
        {loading && <StatusMessage />}
        {error && (
          <StatusMessage type="error" title="No pudimos cargar los métodos.">
            Revisa tu conexión y recarga la página.
          </StatusMessage>
        )}
        {data && (
          <ul className={styles.rows}>
            {data.map((method) => (
              <li key={method.id} className={styles.row}>
                <img src={method.image} alt="" loading="lazy" />
                <div className={styles.rowCopy}>
                  <h2>{method.name}</h2>
                  <p>{method.summary}</p>
                  <dl className={styles.rowFacts}>
                    <div><dt>Café : agua</dt><dd>{method.ratio}</dd></div>
                    <div><dt>Molienda</dt><dd>{method.grind}</dd></div>
                    <div><dt>Tiempo</dt><dd>{method.time}</dd></div>
                  </dl>
                  <Link to={`/metodos/${method.slug}`} className="btn btn-ghost">
                    Aprender a preparar {method.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
