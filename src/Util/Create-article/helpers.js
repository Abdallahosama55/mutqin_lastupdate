import toast from "react-hot-toast";
export const tryCatch = async (cb) => {
  try {
    const res = await cb();
    if (res.isSuccess) return res.data;
    if (res.isError) {
      if (res.error.message === "Aborted")
        throw Error(
          "يبدو أن الخادم يستغرق وقتًا طويلاً للرد، يرجى المحاولة مرة أخرى في وقت لاحق"
        );
      throw Error("حدث خطأ أثناء محاولة جلب البيانات");
    }
  } catch (error) {
    toast.error(
      typeof error === "string"
        ? error
        : error?.message || "حدث خطأ أثناء محاولة جلب البيانات",
      {
        style: { direction: "rtl" },
      }
    );
  }
};

export const validation = (valids) => {
  if (valids.some((v) => !v.value)) {
    let msg = "من فضلك قم بإختيار";

    valids
      .filter((v) => !v.value)
      .forEach((v, i) => {
        msg += `  ${i !== 0 ? "و" : ""}${v.msg}`;
      });

    toast.error(msg, {
      style: { direction: "rtl" },
    });
    return false;
  } else return true;
};
