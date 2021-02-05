import { reactive } from "vue";

const themeColors = [
  {
    fg: "#193e80",
    sc: "crimson",
    bg: "#f3f5f2"
  },
  {
    fg: "#f3f5f2",
    sc: "hotpink",
    bg: "#092760"
  },
  {
    fg: "#c02c1a",
    sc: "limegreen",
    bg: "#f2f3f5"
  },
  {
    fg: "#3e7523",
    sc: "orange",
    bg: "#f5f3f2"
  },
  {
    fg: "#000",
    sc: "gray",
    bg: "#fff"
  },
  {
    fg: "#fff",
    sc: "gray",
    bg: "#000"
  }
];

const themeColor = reactive({
  color: themeColors[parseInt(localStorage.themeColor, 10) || 0]
});

export function useThemeColors() {
  const setThemeColor = (index: number) => {
    themeColor.color = themeColors[index];
    localStorage.themeColor = index;
  };

  return {
    setThemeColor,
    themeColor,
    themeColors
  };
}
