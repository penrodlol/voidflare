import { decode, encode } from 'gpt-3-encoder';

export default function (payload: string) {
  return decode(encode(payload).slice(0, 8000));
}
