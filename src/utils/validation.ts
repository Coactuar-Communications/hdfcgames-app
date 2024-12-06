export const validateEmail = (email: string): boolean =>
    /^[^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/.test(email.toLowerCase());

  export const validatePassword = (password: string): boolean =>
    /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/.test(password);

  export const validateName = (name: string): boolean =>
    /^[A-Za-z0-9_ -]{3,}$/.test(name);

  export const validStartTime = (dateTime: string | Date): boolean =>
    new Date(dateTime) > new Date();

  export const validEndTime = (startTime: string | Date, endTime: string | Date): boolean =>
    new Date(endTime) > new Date(startTime);

  export const validateContacts = (contacts: string): boolean =>
    /^[0-9]{10}$/.test(contacts);

  export const isEmptyObject = (object: Record<string, unknown>): boolean =>
    Object.keys(object).length === 0;