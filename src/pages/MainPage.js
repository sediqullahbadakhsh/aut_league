import landing from "../assets/images/landing.jpg";
import capture from "../assets/images/Capture.JPG";
export default function MainPage() {
  return (
    <div dir="rtl" className="pages">
      <section className="landing-img">
        <img src={landing} alt="logo" />
      </section>
      <section className="main-intro">
        <h2>مسابقات بین المللی رباتیک و هوش مصنوعی فیراکاپ آزاد ایران​</h2>
        <hr className="hr" />
        <p>
          کمیته ملی رباتیک جمهوری اسلامی ایران (فیرا) و انجمن رباتیک ایران با
          همکاری گروه مشاوران توسعه کسب و کار سیناپتک با هدف ایفای نقش موثر در
          پیشبرد بنیادی اهداف توسعه ای و ترویجی علوم و مهارت های مورد نیاز صنعت
          رباتیک، مکاترونیک و هوش مصنوعی، سالیانه مسابقات بین المللی رباتیک و
          هوش مصنوعی (فیرا کاپ آزاد ایران) در لیگ‌های مختلف در دو رده دانش‌آموزی
          و آزاد را در تاریخ های ۱۸ لغایت ۲۲ اردیبهشت ماه ۱۴۰۲ و در مرکز دائمی
          نمایشگاه های بین المللی بازار بزرگ ایران (ایران مال) برگزار می‌کنند.
        </p>
        <p>
          از همه اساتید، پژوهشگران، دانشجویان، دانش آموزان و علاقه مندان در
          زمینه های رباتیک، مکاترونیک و هوش مصنوعی دعوت می شود تا با شرکت در این
          جشنواره ما را در برگزاری باشکوه و موثر این همایش و همچنین ارائه و
          تبادل اطلاعات و دستاوردهای علمی و صنعتی، یاری نمایند. کمیته ملی رباتیک
          جمهوری اسلامی ایران فیرا، انجمن رباتیک ایران و فدراسیون جهانی رباتیک
          فیرا (FIRA) برای تمامی شرکت کنندگان این دوره از مسابقات آرزوی موفقیت
          دارد.
        </p>
      </section>
      <section className="schedule">
        <h2>برنامه ریزی</h2>
        <div className="schedul">
          <div className="sch-circle">
            <hr className="circle" />
          </div>
          <div className="sch-box">
            <p>ثبت نام</p>
            <hr className="hrr" />
            <p>تاریخ</p>
          </div>
          <div className="sch-circle">
            <hr className="circle" />
          </div>
          <div className="sch-box">
            <p>تاریخ</p>
            <hr className="hrr" />
            <p>ثبت نام با تاخیر</p>
          </div>
          <div className="sch-circle">
            <hr className="circle" />
          </div>
          <div className="sch-box">
            <p>برگزاری دوره های آموزشی</p>
            <hr className="hrr" />
            <p>تاریخ</p>
          </div>
          <div className="sch-circle">
            <hr className="circle" />
          </div>
          <div className="sch-box">
            <p>تاریخ</p>

            <hr className="hrr" />
            <p>برگزاری مسابقات ویژه</p>
          </div>
          <div className="sch-circle">
            <hr className="circle" />
          </div>
        </div>
      </section>
      <section className="sponsors">
        <h2>برگزار کننده گان</h2>
        <hr className="hr" />

        <div className="spons-logos">
          <img className="spons-logo" src={capture} alt="logo" />
          <img className="spons-logo" src={capture} alt="logo" />
          <img className="spons-logo" src={capture} alt="logo" />
          <img className="spons-logo" src={capture} alt="logo" />
        </div>
      </section>
    </div>
  );
}
