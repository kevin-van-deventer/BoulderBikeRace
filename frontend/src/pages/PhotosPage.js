import React, { useEffect, useState } from "react";
import axios from 'axios';

import '../pages/Photos.css';

// lightbox library
import ReactImageLightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import the styles for the lightbox

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Track loading state
  const [lightboxIndex, setLightboxIndex] = useState(-1); // To store which image is selected for the lightbox

  // Fetch photos when the component mounts or page changes
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/photos?page=${page}`);
        setPhotos(response.data); // Set the fetched photos (you might want to append to previous photos depending on logic)
      } catch (err) {
        setError('Error fetching photos.');
        console.error('Error fetching photos:', err);
      } finally {
        setLoading(false);
      }
    };
// onerror handler for 404 images - check json data - event listner on error
    fetchPhotos();
  }, [page]); // Trigger fetch when the page changes

  // Handle the click of the next page button
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
  };

  // Handle the click of the previous page button
  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1)); // Decrement page number (don't allow going below 1)
  };
  
  // Open lightbox with clicked image
  const openLightbox = (index) => {
    setLightboxIndex(index); // Set the index of the image to be shown in the lightbox
  };

  // Close the lightbox
  const closeLightbox = () => {
    setLightboxIndex(-1);
  };

  return (
    <div className="app-container">
      <div className="photo-page">
      <h1 className="pageTitle">Gallery</h1>

        {error && <div className="error">{error}</div>}

        <div className="photo-gallery">
          {photos.map((photo, index) => (
            <div key={photo.id} className="photo-card" onClick={() => openLightbox(index)}>
              <img src={photo.image_url} alt={photo.title} />
              <p>{photo.title}</p>
            </div>
          ))}
        </div>

        <div className="pagination-buttons">
          {/* Previous page button */}
          <button 
            onClick={handlePreviousPage}
            disabled={page <= 1 || loading}
          >
            Previous
          </button>
          
          {/* Next page button */}
          <button 
            onClick={handleNextPage}
            disabled={loading}
          >
            Next
          </button>
        </div>

        {loading && <div>Loading more photos...</div>}
        
        {/* Lightbox Modal */}
        {lightboxIndex >= 0 && (
            <ReactImageLightbox
                mainSrc={photos[lightboxIndex].image_url}  // Set the URL for the main image in the lightbox
                nextSrc={photos[(lightboxIndex + 1) % photos.length].image_url} // Next image in the gallery
                prevSrc={photos[(lightboxIndex + photos.length - 1) % photos.length].image_url} // Previous image in the gallery
                onCloseRequest={closeLightbox} // Close the lightbox
                onMovePrevRequest={() => setLightboxIndex((lightboxIndex + photos.length - 1) % photos.length)} // Move to previous image
                onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % photos.length)} // Move to next image
            />
        )}
      </div>
    </div>
  );
};

export default PhotosPage;
