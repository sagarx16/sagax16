import pocketbank from './projects/pocketbank.png';
import pocketbankMobile from './projects/pocketbank-mobile.png';
import snPublicSchool from './projects/sn-public-school.png';
import royalWedding from './projects/royal-wedding.png';
import royalWeddingMobile from './projects/royal-wedding-mobile.png';
import civicVoice from './projects/civic-voice.png';
import sachet from './projects/sachet.png';
import ghibliTribute from './projects/ghibli-tribute.png';
import sageWellness from './projects/sage-wellness.png';

export const projectImages = {
  pocketbank,
  pocketbankMobile,
  snPublicSchool,
  royalWedding,
  royalWeddingMobile,
  civicVoice,
  sachet,
  ghibliTribute,
  sageWellness,
} as const;

export const projectImageByPath: Record<string, ImageMetadata> = {
  '/projects/pocketbank.png': pocketbank,
  '/projects/pocketbank-mobile.png': pocketbankMobile,
  '/projects/sn-public-school.png': snPublicSchool,
  '/projects/royal-wedding.png': royalWedding,
  '/projects/royal-wedding-mobile.png': royalWeddingMobile,
  '/projects/civic-voice.png': civicVoice,
  '/projects/sachet.png': sachet,
  '/projects/ghibli-tribute.png': ghibliTribute,
  '/projects/sage-wellness.png': sageWellness,
};
