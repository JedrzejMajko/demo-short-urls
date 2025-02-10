import  { ButtonCategory } from "../types/enums";

/**
 * Class to generate tailwind classes 
 * @param category 
 * @returns 
 */
export const getButtonClasses = (category: ButtonCategory): string=>{
    
  return getStyles(()=>{

    const classBox = [];
        switch(category){
          case ButtonCategory.primary:
              classBox.push("bg-indigo-700  hover:bg-indigo-500 focus-visible:outline-2 disabled:bg-gray-300 focus-visible:outline-offset-2 focus-visible:outline-indigo-600");
              classBox.push("text-white");
              break;
            case ButtonCategory.secondary:
              classBox.push("border border-indigo-400 hover:border-transparent hover:bg-indigo-600 active:bg-purple-700");
              classBox.push("text-indigo-600  hover:text-white");
              break;
        }

        return classBox;
  })
    
}


/**
 * Converts convinient arrays of tailwind classes to a single string
 * @param callback 
 * @returns 
 */
const getStyles = (callback:  ()=>string[]): string=>{

  const classes = callback();

  if(classes && classes.length > 0){
  return classes.join(" ");
  }
  return "";
}