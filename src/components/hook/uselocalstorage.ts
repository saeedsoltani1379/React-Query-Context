import { useEffect, useState } from "react";

export function UseLicalStorage<T>(key: string, inivalue: T) {
  const [value, setvalue] = useState<T>(() => {
    const storaheitem = localStorage.getItem("localitems");
    if (storaheitem) {
      return JSON.parse(storaheitem);
    } else {
      return inivalue;
    }
  });
  useEffect(() =>{
    localStorage.setItem(key,JSON.stringify(value))
  },[key,value])
  return [value,setvalue] as [typeof value, typeof setvalue]
}
