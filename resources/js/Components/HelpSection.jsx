import { Link } from '@inertiajs/react'

export default function HelpSection({ }) {
    const appUrl = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';

    return (
        <section className="faq-section section-padding" id="section_3">
            <div className="container">
                <div className="">
                    <h2 style={{
                        color: '#1e3963',
                        fontSize: '35px',
                    }}>
                        <b>دایرکتوری اعضای اتاق بازرگانی، صنایع، معادن و کشاورزی ایران </b>
                    </h2>
                    <br />
                    <p style={{
                        textAlign: 'justify',
                        color: 'black',
                    }}>
                        شما می توانید در این صفحه با وارد نمودن کلمه مورد نظر خود در باکس جستجوی فوق، بر روی فیلدهای زیر از اطلاعات اعضای اتاق که دارنده کارت عضویت یا بازرگانی می باشند، جستجوی هوشمند انجام دهید و نتیجه را در همین بخش مشاهده نمایید:
                    </p>
                    <ul style={{
                        textAlign: 'justify',
                        color: 'black',
                    }}>
                        <li style={{
                            color: 'black',
                        }}>
                            نام و نام خانوادگی دارنده کارت
                        </li>
                        <li style={{
                            color: 'black',
                        }}>
                            نام شرکت
                        </li>
                        <li style={{
                            color: 'black',
                        }}>
                            رشته فعالیت (۱۵ عنوان رشته فعالیت اعلام شده توسط سازمان توسعه تجارت)
                        </li>
                        <li style={{
                            color: 'black',
                        }}>
                            مشخصات کسب و کار (این موضوع که بر روی چه کالاهایی توسط اعضای اتاق تولید، صادرات یا واردات صورت می پذیرد؟ به عنوان نمونه با وارد نمودن کلمه «زعفران» می توانید اعضایی که در زمینه تولید، صادرات یا واردات زعفران فعالیت می کنند را در لیست مشاهده کنید).
                        </li>
                    </ul>
                    <br />

                    <h2 style={{
                        color: '#1e3963',
                        fontSize: '35px',
                    }}>
                        <b>راهنمای تصویری</b>
                    </h2>
                    <br />
                    <div className='box-shadow-iccima-1 box-gif-help'>
                        <img src="https://cscs.chambertrust.ir/internet/help/memberDirHelp.gif" alt="راهنمای تصویری<" />
                    </div>
                </div>
            </div>
        </section>

    );
}