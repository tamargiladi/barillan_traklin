import science from './science.json';

export function a() {
  science.data.registres.push({ fullName: 'aaa' });
  console.log('science:', science.data.registres);
}
