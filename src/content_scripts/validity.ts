let global: any = (<any> window);
let document: any = global.document;
let location: any = global.location;

function validity(): boolean {

  const result: boolean = [
    () => document.contentType === 'text/html',
    () => location.protocol.match(/^https?:$/),
    () => location.hostname !== 'localhost',
    () => location.pathname !== '/_/chrome/newtab',
  ].every((fn)=> fn());

  console.log('check', document, location);

  return result;
}

export default validity;
