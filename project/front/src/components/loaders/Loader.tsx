
/**
 * Types of loaders that can be used.
 * @type {string}
 */
type LoaderType = 'spinner' | 'circle';

/**
 * Loader components, each type has its own component.
 */
type LoaderComponents = {
    [key in LoaderType]: JSX.Element;
};

/**
 * Loader components.
 */
const loaderComponents: LoaderComponents = {
    spinner: <i className="fa-duotone fa-circle-notch animate-spin text-5xl"></i>,
    circle: <i className="fa-regular fa-circle animate-ping text-2xl"></i>,
};

/**
 * Loading component.
 * @param {LoaderType} type Type of loader.
 * @returns {JSX.Element} Loading component.
 */
export default function Loader({ type }: { type: LoaderType }): JSX.Element {
    const loader = loaderComponents[type] || loaderComponents.spinner;

    return (
        <div className="w-auto h-auto flex justify-center items-center p-4">
            {loader}
        </div>
    );
}
