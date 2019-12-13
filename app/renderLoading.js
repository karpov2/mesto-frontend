function renderLoading(isLoading) {
    if (isLoading) {
      spinner.classList.add('spinner_visible');
      content.classList.add('content_hidden');
    } else {
      spinner.classList.remove('spinner_visible');
      content.classList.remove('content_hidden');
    }
}

