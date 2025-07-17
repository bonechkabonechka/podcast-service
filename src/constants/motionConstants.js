const pageHomeVariants = {
    initial: { opacity: 0, y: -20, filter: 'blur(5px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -200, filter: 'blur(20px)' },
};
const homeDescriptionVariants = {
    hidden: { y: 50, opacity: 0, filter: 'blur(20px)' },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
};
const languageSliderVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};
const pageHelpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};
const helpFirstVariants = {
    hidden: { y: 100, opacity: 0.2 },
    visible: { y: 0, opacity: 1 },
};
const helpSecondVariants = {
    hidden: { scale: 0.9, opacity: 0.2, filter: 'blur(10px)' },
    visible: { scale: 1, opacity: 1, filter: 'blur(0px)' },
};
const pageFeaturesVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};
const featuresFirstVariants = {
    hidden: { y: 100, opacity: 0.2 },
    visible: { y: 0, opacity: 1 },
};
const featuresSecondVariants = {
    hidden: { scale: 0.9, opacity: 0.2, filter: 'blur(10px)' },
    visible: { scale: 1, opacity: 1, filter: 'blur(0px)' },
};

export {
    pageHomeVariants,
    homeDescriptionVariants,
    languageSliderVariants,
    pageHelpVariants,
    helpFirstVariants,
    helpSecondVariants,
    featuresFirstVariants,
    featuresSecondVariants,
    pageFeaturesVariants,
};
