document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  if (query) {
      fetchBooks(query);
  }
});

async function fetchBooks(query) {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      displayResults(data.items);
  } catch (error) {
      console.error('Error fetching book data:', error);
      document.getElementById('results').innerHTML = '<p>Error fetching book data. Please try again.</p>';
  }
}

function displayResults(books) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (books && books.length > 0) {
      books.forEach(book => {
          const bookInfo = book.volumeInfo;
          const bookElement = document.createElement('div');
          bookElement.classList.add('book');

          bookElement.innerHTML = `
              <h2>${bookInfo.title}</h2>
              <p><strong>Author:</strong> ${bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown'}</p>
              <p><strong>Description:</strong> ${bookInfo.description ? bookInfo.description.substring(0, 150) + '...' : 'No description available.'}</p>
              <a href="${bookInfo.infoLink}" target="_blank">More Info</a>
          `;

          resultsContainer.appendChild(bookElement);
      });
  } else {
      resultsContainer.innerHTML = '<p>No books found. Please try a different search.</p>';
  }
}
