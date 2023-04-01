export default function Contact() {
  return (
    <div dir="rtl" className="pages">
      <section className="schedule">
        <h2>تماس با ما</h2>
        <p>
          ایران. نمایشگاه بین المللی تهران. خانه نوآوری و فناوری ایران – IHit
          (سالن ۳۷A){" "}
        </p>
        <p>تلفن: ۰۲۱۲۳۴۵۶۷۸۹۰</p>
        <p>واحد ثبت‌نام و امور شرکت‌کنندگان: ۸۸۱۴۰۱۷۴-۰۲۱ داخلی ۳</p>
        <p>واحد تبلیغات، برندینگ و توسعه محصولات: ۹۱۰۷۳۷۳۷-۰۲۱ داخلی ۲۰۴</p>
      </section>
      <section className="contact-form">
        <h2>نظرات خود را با ما در میان بگذارید.</h2>
        <form>
          <input type="text" name="name" placeholder="اسم خود را وارد کنید." />

          <input
            type="text"
            name="email"
            placeholder="ایمیل خود را وارد کنید"
          />

          <textarea name="message" placeholder="متن خودرا وارد کنید" />

          <input className="button" type="submit" value="ارسال" />
        </form>
      </section>
    </div>
  );
}
