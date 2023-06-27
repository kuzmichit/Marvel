import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const Comics = () => {
  return (
    <>
      <ErrorBoundary>
        <AppBanner/>
        <ComicsList/>
      </ErrorBoundary>
    </>
  );
};
export default Comics;