import '@testing-library/jest-dom';

// react-router и @tanstack/query ожидают наличие TextEncoder/TextDecoder в окружении jsdom
import { TextEncoder, TextDecoder } from 'util';

// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;



