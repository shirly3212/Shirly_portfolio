
import { ProjectData, DiverseDesign, Section } from './types';

export const ROLES = ["Graphic Designer", "Web Designer", "Editor", "Motion Designer"];

export const N12_MAGAZINE_IMAGES = {
    scroll1: "img_new/project_a.png",
    scroll2: "img_new/scroling_1.png",
    fade1: ["img_new/img_new_003.jpeg", "img_new/2.png", "img_new/3.png", "img_new/img_new_002.jpeg"],
    fade2: ["img_new/img_new_004.jpeg", "img_new/img_new_005.jpeg", "img_new/img_new_006.jpeg", "img_new/1.png", "img_new/4.png"]
};

export const GALGALTZ_IMAGES = [
    "img_new/img_1.jpg", 
    "img_new/img_7.jpg", 
    "img_new/img_4.png", 
    "img_new/img_2.png", 
    "img_new/img_3.png"
];

export const PHOTO_EDITING_IMAGES = {
    before: "img_new/portrait_before.jpg.png",
    color_corrected: "img_new/portrait_color_corrected.jpg.jpg",
    mic_removed: "img_new/portrait_mic_removed.jpg.png",
    new_shirt: "img_new/portrait_new_shirt.jpg.png",
    no_bg: "img_new/portrait_no_bg.png.png",
};

export const DIVERSE_DESIGNS: DiverseDesign[] = [
    { src: "img_new/img_new_016.jpeg", title: "News 12 Archive" },
    { src: "img_new/img_new_014.png", title: "Look Them in the Eyes" },
    { src: "img_new/img_new_013.jpeg", title: "October 7th Memorial" },
    { src: "img_new/img_new_012.png", title: "The Political Arena" },
    { src: "img_new/img_new_009.jpeg", title: "The Power of Iran" },
    { src: "img_new/img_new_011.jpeg", title: "World Cup 2022" },
    { src: "img_new/img_new_010.jpeg", title: "War Room Update" },
];

export const ALL_GRAPHIC_PROJECTS: ProjectData[] = [
    {
        title: "World Cup 22 Infographic",
        image: "../img/thumbnail1.jpg",
        description: "Infographic for the 2022 World Cup, featuring key stats and highlights.",
        technologies: ["Adobe Illustrator", "Infographics"],
        live_demo: "https://makospecial.co.il/worldcup22",
        type: "graphic"
    },
    {
        title: "Road Accidents Data Visualization",
        image: "../img/thumbnail2.jpg",
        description: "Data visualization on road accident statistics, highlighting safety information.",
        technologies: ["Adobe Photoshop", "Data Analysis"],
        live_demo: "https://specialprojects.mako.co.il/Road_Accidents",
        type: "graphic"
    },
    {
        title: "Ukraine and Russia war",
        image: "../img/ukraineeee12.png",
        description: "Graphics created to raise awareness about the war between Ukraine and Russia.",
        technologies: ["Adobe InDesign", "Illustrations"],
        live_demo: "https://makospecial.co.il/ukrainewar?makoOpenChromeTabs=1",
        type: "graphic"
    },
    {
        title: "Britney 40 - Pop Culture Infographic",
        image: "../img/thumbnail4.jpg",
        description: "Infographic celebrating Britney Spears' 40th birthday.",
        technologies: ["Adobe Illustrator", "Pop Culture"],
        live_demo: "https://makospecial.co.il/40Britney",
        type: "graphic"
    },
    {
        title: "Israeli Politics - Data Visualization",
        image: "../img/thumbnail5.jpg",
        description: "Data visualization on Israeli politics, illustrating key aspects and trends.",
        technologies: ["Adobe Illustrator", "Data Visualization"],
        live_demo: "https://makospecial.co.il/israel_politics",
        type: "graphic"
    },
    {
        title: "Homat Magen - Operation Overview",
        image: "../img/thumbnail6.jpg",
        description: "Graphic overview of Operation 'Homat Magen'.",
        technologies: ["Adobe Photoshop", "Infographics"],
        live_demo: "https://makospecial.co.il/homat_magen",
        type: "graphic"
    }
];

export const SECTIONS: Section[] = [
    { id: 'all-graphic-projects', title: 'All Projects' },
    { id: 'n12-magazine', title: 'N12 Magazine' },
    { id: 'galgaltz', title: 'Galgaltz N12' },
    { id: 'editing-suite', title: 'Editing Suite' },
    { id: 'spectrum-of-work', title: 'Gallery' },
];
