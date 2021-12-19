export function getURL(asPath) {
  let rootURL = '';
  if (process.env.NODE_ENV === 'development') {
    rootURL = 'http://localhost:3000';
  } else {
    rootURL = 'https://onlinecowork.com';
  }

  return rootURL + asPath;
}
