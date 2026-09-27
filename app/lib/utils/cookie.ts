import Cookie from "js-cookie";

const dev = process.env.NEXT_PUBLIC_NODE_ENV === "development";
const parentDomain = process.env.NEXT_PUBLIC_APP_PARENT_DOMAIN;

export const setCookie = (key: string, value: string) => {
    return Cookie.set(key, value, {
        path: "/",
        expires: 2,
        ...(!dev ? { domain: parentDomain } : {}),
    });
};

export const getCookie = (key: string) => {
    return Cookie.get(key);
};

export const deleteCookie = (key: string) => {
    return Cookie.remove(key, {
        path: "/",
        ...(!dev ? { domain: parentDomain } : {}),
    });
};

const cookie = () => ({ setCookie, getCookie, deleteCookie });

export default cookie;