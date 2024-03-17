import React, { useState } from "react";
import "./Control.css";
import curve from "../../assets/Images/dashboredCards/curve.png";
import TableC from "./Table";
import CallMadeIcon from "@mui/icons-material/CallMade";
import haverimg1 from "../../assets/Images/dashboredCards/amico.png";
import haverimg2 from "../../assets/Images/dashboredCards/amico1.png";
import haverimg3 from "../../assets/Images/dashboredCards/cuate.png";
import haverimg4 from "../../assets/Images/dashboredCards/amico4.png";
import article from "../../assets/Images/control/ooui_articles-rtl.svg";
import shopping from "../../assets/Images/control/entypo_shopping-bag.svg";
import annoucement from "../../assets/Images/control/annoucement.svg";
import fluent from "../../assets/Images/control/fluent_script-20-filled.svg";
import homeicon from "../../assets/Images/control/iconamoon_home-fill.svg";
import facebook from "../../assets/Images/control/bi_facebook.svg";
export default function Control() {
  const [isHovered, setIsHovered] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const HandleShow = () => {
    if (showMore == true) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  };
  const items = [
    {
      title: "أفكار المقالات",
      description:
        "اكتشف أفكارًا جديدة ومبتكرة باستخدام أداتنا لتوليد أفكار مقالات متنوعة",
      icon: article, // Add the icon name here
    },
    {
      title: "وصف المنتج ",
      description:
        " اكتب وصفا مفصلا وجذابا للمنتج باستخدام أداتنا لكتابة معلومات شاملة ",
      icon: shopping, // Add the icon name here
    },
    {
      title: " أفكار إعلانية",
      description:
        "اكتسب أفكاراً إعلانية مبتكرة بواسطة أداتنا، لضمان جاذبية أعلى لإعلاناتك",
      icon: annoucement, // Add the icon name here
    },
    {
      title: " سكريبت فيديو يوتيوب",
      description: "قم بكتابة سكريبت يوتيوب يساعد في توصيل رسالتك بشكل فعال",
      icon: fluent, // Add the icon name here
    },
    {
      title: " وصف العقارات",
      description:
        "إنشاء وصف شامل وجذاب للعقارات باستخدام أداتنا لجذب انتباه المهتمين     ",
      icon: homeicon, // Add the icon name here
    },
    {
      title: "منشورات فيسبوك ",
      description:
        "زود صفحتك على فيسبوك بمحتوى متنوع وجذاب يجذب الانتباه والتفاعل",
      icon: facebook, // Add the icon name here
    },
  ];

  const cardData = [
    {
      id: 1,
      number: "55",
      text: "أحصل علي إجابات فورية و دقيقة علي أسئلتك واستمتع بتفاعل متقدم يبلي احتياجاتك. ابدأ دردشة الأن",
      title: "ابدا محادثة جديدة",
      src: haverimg1,
    },
    {
      id: 2,
      number: "12",
      text: "كن جزءا من تجربة تصميم فريدة، ابتكر تصاميم مذهلة حيث يقوم مُتقِن بتحليل متطلباتك وتحويلها إلى صور رائعة.",
      title: "صمم صورة جديدة",
      src: haverimg2,
    },
    {
      id: 3,
      number: "24",
      text: " اكتب مقالات تتناسب مع احتياجاتك بشكل احترافي، ولتحسين SEO حيث يكتب مُتقِن محتوى ذكي يلبي احتياجاتك.",
      title: "كتابة مقال احترافي",
      src: haverimg3,
    },
    {
      id: 4,
      number: "08",
      text: "يقوم مُتقِن بفحص نصوصك بدقة، يصحح الأخطاء الإملائية والنحوية، ويضمن لك دقة لغوية عالية في كتاباتك.",
      title: "المدقق اللغوي",
      src: haverimg4,
    },
  ];

  return (
    <section className="Control  ">
      <div className="container-fluid p-0 m-0">
        <div className=" p-0  mx-auto">
          <div
            dir="rtl"
            className=" controlHeight overflow-y-scroll   pt-2 pb-2 ">
            <div
              dir="ltr"
              className="containerC">
              <div
                className="welcome  rounded-4  pt-3 pb-3   p-4"
                dir="rtl">
                <h3 className=" font-bold fw-bolder font-basic ">
                مَرحباً مصطفي
                </h3>
                <p className="welcome-p  breif-title mt-2 font-basic pb-0">
                مجموعة الأدوات الأكثر تطورا في كتابة المحتوى متوفرة هنا
                </p>
                <div className="row justify-content-between pb-0 ">
                  {cardData.map((item) => {
                    return (
                      <div
                        className="    pb-0 col-xl-3 p-xl-2 p-xxl-2 p-md-2 p-lg-2 p-1 col-lg-6 col-md-6 col-sm-6 col-6 "
                        onMouseEnter={() => setHoveredCard(item.id)}
                        onMouseLeave={() => setHoveredCard(null)}>
                        <div
                          className={` position-relative img${item.number}  cards      pe-3 py-4
                                   mt-0 d-flex flex-column justify-content-between`}
                          key={item.id}>
                          <div className="">
                            <h4 className="font-basic">{item.title}</h4>
                            <p className=" font-light p-welcome-text py-3 ">
                              {item.text}
                            </p>
                          </div>

                          <div className="  position-absolute bottom-0 icon-arrow  ">
                            <img
                              src={curve}
                              className="w-100 h-100 "
                            />
                            <div
                              style={{ transform: "rotate(-95deg)" }}
                              className={`  d-flex  justify-content-center align-items-center     icon-arrow-img${item.number}  position-absolute `}>
                              <CallMadeIcon fontSize="10" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className=" p-3 font-basic "
                dir="rtl">
                <h5 className="py-3 pb-3">الأدوات الأكثر إستخداماً</h5>
                <div className="p-3 rounded-3  border-blue">
                  <div className="row">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="col-xl-4 p-2 col-lg-4 col-xxl-4 col-md-6">
                        <div className="rounded-3 border-blue pb-0 p-2">
                          <div className="d-flex justify-content-center align-items-center">
                            <div>
                              {/* Render the icon component */}
                              <img src={item.icon}></img>
                            </div>
                            <div className="p-2 pb-0">
                              <small className="d-block fw-normal">
                                {item.title}
                              </small>
                              <p className="text-muted font-small-p font-light fw-light">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="control-table mt-5 p-3 font-basic   rounded-4 "
                dir="rtl">
                <h5 className="p-2">أخر الانشطة</h5>
                <div className="table-con p-4">
                  <div className="table-head">
                    <p>عرض</p>
                    <select className="form-select font-basic select-num-show rounded-2 d-inline-block">
                      <option
                        selected
                        value="20">
                        20
                      </option>
                      <option value="10">10</option>
                    </select>
                    <input
                      type="text"
                      className="form-controld-inline-block me-3 rounded-2 search-input"
                      placeholder="بحث"
                    />
                  </div>
                  <div>
                    <TableC />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
