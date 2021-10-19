import { serverHttp } from './app';

serverHttp.listen(3333, () => {
  console.log('Server listening on port 3333');
});
