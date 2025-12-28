import CtaSection from '@/components/landing-page/cta-section';
import ForClinicSection from '@/components/landing-page/for-clinic-section';
import HeroSection from '@/components/landing-page/hero-section';
import HowItWorksSection from '@/components/landing-page/how-it-works-section';
import NearLocationSection from '@/components/landing-page/near-location-section';
import WhyChooseUsSection from '@/components/landing-page/why-choose-us-section';
import LandingLayout from '@/layouts/landing-layout';

type Klinik = {
    id: number;
    kode_klinik: string;
    nama_klinik: string;
    jenis_klinik: string;
    alamat: string;
    kota: string;
    provinsi: string;
    no_telepon: string;
    email: string;
    deskripsi: string;
    latitude: number;
    longitude: number;
    gambar: string;
    rating: number;
    kapasitas_total: number;
    kapasitas_tersedia: number;
};

type PageProps = {
    kliniks: Klinik[];
};

export default function LandingIndexPage({ kliniks }: PageProps) {
    return (
        <LandingLayout>
            <HeroSection />
            <NearLocationSection kliniks={kliniks} />
            <WhyChooseUsSection />
            <HowItWorksSection />
            <ForClinicSection />
            <CtaSection />
        </LandingLayout>
    );
}
