import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

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
            const { data } = await axios.get('https://app.strkfarm.xyz/api/stats')
            return data?.tvl
        }
    });

    if (error) {
        console.error(error);
    }

    const formattedTvlData = (tvlData: number) => {
        if (tvlData >= 1000000) {
          return `$${(tvlData / 1000000).toFixed(2)}m`;
        } else if (tvlData >= 1000) {
          return `$${(tvlData / 1000).toFixed(2)}k`;
        } else {
          return `$${tvlData.toString()}`;
        }
      };

    return (
        <div className="mt-32 flex flex-col gap-10 lg:flex-row justify-around rounded-2xl bg-opacity-80 bg-gradient-to-r from-[#2E2C5C] to-[#295446] py-8">
            <div className="flex flex-col items-center justify-center gap-3">
                <h4 className="text-white/90 text-lg">TVL</h4>

                {tvlLoading ? (
                    <div className='h-12 w-32 animate-pulse bg-gradient-to-r from-[#36735e] to-[#295446] rounded-lg' />
                ) : (
                    <span className="font-bold text-[#61EDAA] text-5xl">
                        {formattedTvlData(tvlData)}
                    </span>
                )}
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
                <h4 className="text-white/90 text-lg">
                    Total rewards generated
                </h4>

                {isLoading ? (
                    <div className='h-12 w-28 animate-pulse bg-gradient-to-r from-[#36735e] to-[#295446] rounded-lg' />
                ) : (
                    <span className="font-bold text-[#61EDAA] text-5xl">
                        ${(generatedRewardsData?.totalStrkHarvested?.USDValue / 1000).toFixed(1)}k
                    </span>
                )}

            </div>

            <div className="flex flex-col items-center justify-center gap-3">
                <h4 className="text-white/90 text-lg">
                    Supported pools
                </h4>
                <span className="font-bold text-[#61EDAA] text-5xl">
                    50+
                </span>
            </div>
        </div>
    )
}

export default Stats