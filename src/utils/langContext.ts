import { LanguagePrefix } from '@shared/index';
import { createContext } from 'react';

export const langContext = createContext<LanguagePrefix>('ru');
