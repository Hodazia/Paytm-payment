import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/Card';
import { Wallet, Users, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button'
import { Navbar } from '../components/landing/Navbar';
import './Landing.css';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Demo } from '../components/landing/Demo';
import { FinalCTA } from '../components/landing/FinalCTA';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br 
    from-slate-50 via-teal-50 
    to-slate-100">
      <Navbar />
      <Hero />
      <Demo />
      <Features />
           
     <FinalCTA />
    </div>
  );
};