export interface HeroTextContent {
    heading1: string;
    heading2: string;
    paragraphs: string[]; // An array of strings
}

const heroText: HeroTextContent = {
    heading1: "Still Running,",
    heading2: "Not Hunting",
    paragraphs: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio possimus...",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. At eius illum fugit...",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. At eius illum fugit..."
    ]
};

export default heroText;