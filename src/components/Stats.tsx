"use client";
import { getHosturl } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';

const endpoint = "https://indexer-graphql-api.onrender.com"

const REWARDS_QUERY = `
    query Query {
      totalHarvests
      totalStrkHarvested {
        STRKAmount
        USDValue
        rawSTRKAmount
      }
    }
`;

const Stats = () => {
    useEffect(() => {
        console.log("=========================================");
        console.info("If you are here for Fullstack SC dev role, here is the hint:");
        console.log("You can find the secret here:");
        console.log("https://sepolia.starkscan.co/contract/0x0459d69edb970e2b12ce7fd1fc1eae6c78e077a88f798e6d95579b7eccd3b8e0");
        console.log("Note: Prefer using Braavos wallet to be able to edit gas if transaction fails due to low gas.");
        console.log("=========================================");
      }, []);

    const { data: generatedRewardsData, isLoading, error } = useQuery({
        queryKey: ["total-rewards-generated"],
        queryFn: async () => {
            const { data } = await axios.post(endpoint, {
                query: REWARDS_QUERY
            })
            return data?.data;
        }
    });

    const { data: tvlData, isLoading: tvlLoading } = useQuery({
        queryKey: ["tvl"],
        queryFn: async () => {
            const { data } = await axios.get(`https://app.${getHosturl()}/api/stats`)
            return data?.tvl
        }
    });

    if (error) {
        console.error(error);
    }

    function formatCurrency(amount: number) {
        // if < 1k, show as is
        // if < 1m, show as k
        // else show as m
        if (amount < 1000) {
            return `$${amount}`;
        } else if (amount < 1000000) {
            return `$${(amount / 1000).toFixed(2)}k`;
        } else {
            return `$${(amount / 1000000).toFixed(2)}m`;
        }
    }

    return (
        <div className="mt-32 flex flex-col gap-10 lg:flex-row justify-around rounded-2xl bg-[#212121B2] py-8">
            <div className="flex flex-col items-center justify-center gap-3">
                <h4 className="text-white/90 text-lg">TVL</h4>

                {tvlLoading ? (
                    <div className='h-12 w-32 animate-pulse bg-gradient-to-r from-[#9069F0] to-[#9069F0] rounded-lg' />
                ) : (
                    <span className="font-bold text-[#9069F0] text-5xl">
                        {formatCurrency(tvlData)}
                    </span>
                )}
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
                <h4 className="text-white/90 text-lg">
                    Total rewards generated
                </h4>

                {isLoading ? (
                    <div className='h-12 w-28 animate-pulse bg-gradient-to-r from-[#9069F0] to-[#9069F0] rounded-lg' />
                ) : (
                    <span className="font-bold text-[#9069F0] text-5xl">
                        ${(generatedRewardsData?.totalStrkHarvested?.USDValue / 1000).toFixed(1)}k
                    </span>
                )}

            </div>

            <div className="flex flex-col items-center justify-center gap-3">
                <h4 className="text-white/90 text-lg">
                    Supported pools
                </h4>
                <span className="font-bold text-[#9069F0] text-5xl">
                    50+
                </span>
            </div>
        </div>
    )
}

export default Stats