const Footer = () => {
    return (
        <footer className="bg-gray-400 text-gray-800 text-sm py-3 text-center">
            <div className="container mx-auto text-center text-sm space-y-2">
                <p>&copy; {new Date().getFullYear()} NexaPay Bank. All rights reserved.</p>
                <p>Need help? Contact support@nexapay.com</p>
            </div>
        </footer>
    );
};

export default Footer;