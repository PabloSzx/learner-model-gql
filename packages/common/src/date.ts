import format from "date-fns/format/index.js";
import es from "date-fns/locale/es/index.js";

export const formatSpanish: typeof format = (date, formatTemplate, options) => {
  return format(date, formatTemplate, {
    ...options,
    locale: es,
  });
};
