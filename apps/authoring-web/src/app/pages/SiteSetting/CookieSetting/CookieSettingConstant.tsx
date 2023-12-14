import { Box, Skeleton, Stack } from '@mui/material';
import Envelop from '../../../assets/Envelop.svg';
import Location from '../../../assets/Location.svg';
import Phone from '../../../assets/Phone.svg';
import Searchheadericon from '../../../assets/Searchheadericon.svg';
import Ctaround from '../../../assets/ctaround.svg';
import Ctasearch from '../../../assets/ctasearch.svg';
import Headerpublic from '../../../assets/headerpublic.svg';

export const InformativeCookieSkeleton = (border) => (
  <>
    <Stack
      sx={{
        backgroundColor: '#F3FAFF',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '194px',
        padding: '5px',
        marginTop: '16px',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box
          sx={
            border === 1
              ? {
                  border: '1px dashed #8CC8FA',
                  padding: '3px',
                  width: '75%',
                  borderRadius: '5px',
                }
              : { width: '75%', padding: '0 3px' }
          }
        >
          <Skeleton
            variant='rectangular'
            sx={{ width: '100%', height: '13px', background: '#C8E1FC' }}
            animation={border === 1 ? 'wave' : false}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            sx={
              border === 2
                ? {
                    border: '1px dashed #8CC8FA',
                    padding: '3px',
                    width: '25%',
                    borderRadius: '5px',
                  }
                : { width: '25%', padding: '0 3px' }
            }
          >
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '14px',
                background: '#C8E1FC',
                padding: '3px',
              }}
              animation={border === 2 ? 'wave' : false}
            />
          </Box>
        </Box>

        <Box
          sx={
            border === 3
              ? {
                  border: '1px dashed #8CC8FA',
                  padding: '3px',
                  width: '75%',
                  borderRadius: '5px',
                }
              : { width: '75%', padding: '0 3px' }
          }
        >
          <Skeleton
            variant='rectangular'
            sx={{
              width: '100%',
              height: '5px',
              background: '#C8E1FC',
            }}
            animation={border === 3 ? 'wave' : false}
          />
          <Skeleton
            variant='rectangular'
            sx={{
              width: '33%',
              height: '5px',
              marginTop: '5px',
              background: '#C8E1FC',
            }}
            animation={border === 3 ? 'wave' : false}
          />
        </Box>
      </Box>
    </Stack>
  </>
);

export const ConsetCookieSkeleton = (border) => (
  <>
    <Stack
      sx={{
        backgroundColor: '#F3FAFF',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '194px',
        padding: '0 4px 0 15px',
        marginTop: '16px',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            width: '60%',
            border: border === 1 ? '1px dashed #8CC8FA' : '',
            padding: '7px 3px',
            paddingBottom: border === 1 ? '7px' : '0',
            borderRadius: '5px',
          }}
        >
          <Skeleton
            variant='rectangular'
            sx={{ width: '100%', height: '13px', background: '#C8E1FC' }}
            animation={border === 1 ? 'wave' : false}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '40%',
              flexWrap: 'nowrap',
              border: border === 2 ? '1px dashed #8CC8FA' : '',
              padding: '3px',
              paddingTop: border === 2 ? '3px' : '0',
              borderRadius: '5px',
            }}
          >
            <Skeleton
              variant='rectangular'
              sx={{
                width: '50%',
                height: '14px',
                marginRight: '3px',
                background: '#C8E1FC',
              }}
              animation={border === 2 ? 'wave' : false}
            />
            <Skeleton
              variant='rectangular'
              sx={{ width: '50%', height: '14px', background: '#C8E1FC' }}
              animation={border === 2 ? 'wave' : false}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: '60%',
            border: border === 3 ? '1px dashed #8CC8FA' : '',
            padding: '3px 7px',
            borderRadius: '5px',
            paddingTop: border === 3 ? '3px' : '0',
          }}
        >
          <Skeleton
            variant='rectangular'
            sx={{
              width: '100%',
              height: '5px',
              background: '#C8E1FC',
            }}
            animation={border === 3 ? 'wave' : false}
          />
          <Skeleton
            variant='rectangular'
            sx={{
              width: '50%',
              height: '5px',
              marginTop: '5px',
              background: '#C8E1FC',
            }}
            animation={border === 3 ? 'wave' : false}
          />
        </Box>
      </Box>
    </Stack>
  </>
);

const nonAndessentialCookieSkeleton = (border) => (
  <>
    <Stack
      sx={{
        backgroundColor: '#F3FAFF',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '194px',
        padding: '5px',
        marginTop: '16px',
      }}
    >
      <Box sx={{ width: '100%', paddingLeft: '10px' }}>
        <Box sx={{ width: '80%' }}>
          <Skeleton
            variant='rectangular'
            sx={{ width: '100%', height: '13px', background: '#C8E1FC' }}
            animation={false}
          />
        </Box>
        <Box sx={{ width: '80%', marginTop: '16px' }}>
          <Skeleton
            variant='rectangular'
            sx={{
              width: '100%',
              height: '5px',
              background: '#C8E1FC',
            }}
            animation={false}
          />
          <Skeleton
            variant='rectangular'
            sx={{
              width: '50%',
              height: '5px',
              background: '#C8E1FC',
              marginTop: '4px',
            }}
            animation={false}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            marginTop: '15px',
          }}
        >
          <Box
            sx={{
              width: '42%',
              padding: '13px 5px',
              border: border === 1 ? '1px dashed #8CC8FA' : '',
              borderRadius: '5px',
            }}
          >
            <Skeleton
              variant='rectangular'
              sx={{ width: '100%', height: '13px', background: '#C8E1FC' }}
              animation={border === 1 ? 'wave' : false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '5px',
                background: '#C8E1FC',
                marginTop: '12px',
              }}
              animation={border === 1 ? 'wave' : false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '5px',
                background: '#C8E1FC',
                marginTop: '4px',
              }}
              animation={border === 1 ? 'wave' : false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '5px',
                background: '#C8E1FC',
                marginTop: '4px',
              }}
              animation={border === 1 ? 'wave' : false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '50%',
                height: '5px',
                background: '#C8E1FC',
                marginTop: '4px',
              }}
              animation={border === 1 ? 'wave' : false}
            />
          </Box>
          <Box
            sx={{
              width: '42%',
              padding: '13px 5px',
              border: border === 2 ? '1px dashed #8CC8FA' : '',
              borderRadius: '5px',
            }}
          >
            <Skeleton
              variant='rectangular'
              sx={{ width: '100%', height: '13px', background: '#C8E1FC' }}
              animation={border === 2 ? 'wave' : false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '5px',
                background: '#C8E1FC',
                marginTop: '12px',
              }}
              animation={border === 2 ? 'wave' : false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '5px',
                background: '#C8E1FC',
                marginTop: '4px',
              }}
              animation={border === 2 ? 'wave' : false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '5px',
                background: '#C8E1FC',
                marginTop: '4px',
              }}
              animation={border === 2 ? 'wave' : false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '50%',
                height: '5px',
                background: '#C8E1FC',
                marginTop: '4px',
              }}
              animation={border === 2 ? 'wave' : false}
            />
          </Box>
          <Box sx={{ width: '16%', padding: '13px 0', marginLeft: '4px' }}>
            <Skeleton
              variant='rectangular'
              sx={{ width: '100%', height: '13px', background: '#C8E1FC' }}
              animation={false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '13px',
                background: '#C8E1FC',
                marginTop: '4px',
              }}
              animation={false}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  </>
);
export const informativeCookieSkeletonList = [
  {
    title: 'title_will_be_updated_here',
    component: InformativeCookieSkeleton(1),
  },
  {
    title: 'button_will_be_updated_here',
    component: InformativeCookieSkeleton(3),
  },
  {
    title: 'description_will_be_updated_here',
    component: InformativeCookieSkeleton(2),
  },
];

export const consentCookieSkeletonList = [
  {
    title: 'title_will_be_updated_here',
    component: ConsetCookieSkeleton(1),
  },
  {
    title: 'button_will_be_updated_here',
    component: ConsetCookieSkeleton(2),
  },
  {
    title: 'description_will_be_updated_here',
    component: ConsetCookieSkeleton(3),
  },
  {
    title: 'essential_cookie_will_be_updated_here',
    component: nonAndessentialCookieSkeleton(1),
  },
  {
    title: 'non_essential_cookie_will_be_updated_here',
    component: nonAndessentialCookieSkeleton(2),
  },
];

export const SiteLogoSkeleton = (pos) => (
  <>
    <Stack
      sx={{
        marginTop: '16px',
        backgroundColor: '#F3FAFF',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '194px',
        padding: '20px',
      }}
      spacing={1}
    >
      {/* For variant="text", adjust the height via font-size */}
      <Box>
        <Skeleton
          variant='rectangular'
          sx={{
            marginTop: '5px',
            background: '#C8E1FC',
            border: pos === 1 ? '1px dashed #4B9EF9' : '0',
            borderRadius: '5px',
          }}
          width={50}
          height={50}
          animation={pos === 1 ? 'wave' : false}
        />

        <Box
          sx={{
            marginTop: '25px',
            padding: '5px',
            border: pos === 2 ? '1px dashed #4B9EF9' : '0',
            borderRadius: '5px',
          }}
        >
          <Skeleton
            variant='rectangular'
            sx={{
              width: '100%',
              height: '5px',
              background: '#C8E1FC',
            }}
            animation={pos === 2 ? 'wave' : false}
          />
          <Skeleton
            variant='rectangular'
            sx={{
              width: '100%',
              height: '5px',
              marginTop: '12px',
              background: '#C8E1FC',
            }}
            animation={pos === 2 ? 'wave' : false}
          />
          <Skeleton
            variant='rectangular'
            sx={{
              width: '100%',
              height: '5px',
              marginTop: '12px',
              background: '#C8E1FC',
            }}
            animation={pos === 2 ? 'wave' : false}
          />
          <Skeleton
            variant='rectangular'
            sx={{
              width: '50%',
              height: '5px',
              marginTop: '12px',
              background: '#C8E1FC',
            }}
            animation={pos === 2 ? 'wave' : false}
          />
        </Box>
      </Box>
    </Stack>
  </>
);

export const ContactUsSkeleton = (
  <>
    <Stack
      sx={{
        marginTop: '16px',
        backgroundColor: '#F3FAFF',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '194px',
        padding: '20px',
      }}
      spacing={1}
    >
      {/* For variant="text", adjust the height via font-size */}
      <Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box
            sx={{
              marginRight: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={Location} alt='Location' />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '5px',
                background: '#C8E1FC',
              }}
              animation={false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '40%',
                height: '5px',
                marginTop: '12px',
                background: '#C8E1FC',
              }}
              animation={false}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', marginTop: '31px' }}>
          <Box
            sx={{
              marginRight: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={Envelop} alt='Envelop' />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '5px',
                background: '#C8E1FC',
              }}
              animation={false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '100%',
                height: '5px',
                marginTop: '12px',
                background: '#C8E1FC',
              }}
              animation={false}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', marginTop: '31px' }}>
          <Box
            sx={{
              marginRight: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={Phone} alt='Phone' />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Skeleton
              variant='rectangular'
              sx={{
                width: '40%',
                height: '5px',
                background: '#C8E1FC',
              }}
              animation={false}
            />
            <Skeleton
              variant='rectangular'
              sx={{
                width: '40%',
                height: '5px',
                marginTop: '12px',
                background: '#C8E1FC',
              }}
              animation={false}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  </>
);

export const AddLinkSkeleton = (
  <Stack
    sx={{
      marginTop: '16px',
      backgroundColor: '#F3FAFF',
      display: 'flex',
      justifyContent: 'flex-end',
      alignContent: 'center',
      width: '100%',
      height: '194px',
    }}
    spacing={1}
  >
    {/* For variant="text", adjust the height via font-size */}
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          border: '1px dashed #8CC8FA',
          borderRadius: '5px',
          padding: '5px',
          position: 'absolute',
          width: '20%',
          left: '5%',
          top: '5px',
        }}
      >
        <Skeleton
          sx={{
            backgroundColor: '#F3FAFF',
            height: '15px',
          }}
          variant='rectangular'
        />
      </Box>
      <Box
        sx={{
          border: '1px dashed #8CC8FA',
          borderRadius: '5px',
          padding: '5px',
          position: 'absolute',
          width: '20%',
          left: '28%',
          top: '5px',
        }}
      >
        <Skeleton
          sx={{
            backgroundColor: '#F3FAFF',
            height: '15px',
          }}
          variant='rectangular'
        />
      </Box>
      <Box
        sx={{
          border: '1px dashed #8CC8FA',
          borderRadius: '5px',
          padding: '5px',
          position: 'absolute',
          width: '20%',
          left: '51%',
          top: '5px',
        }}
      >
        <Skeleton
          sx={{
            backgroundColor: '#F3FAFF',
            height: '15px',
          }}
          variant='rectangular'
        />
      </Box>
      <Box
        sx={{
          border: '1px dashed #8CC8FA',
          borderRadius: '5px',
          padding: '5px',
          position: 'absolute',
          width: '20%',
          left: '75%',
          top: '5px',
        }}
      >
        <Skeleton
          sx={{
            backgroundColor: '#F3FAFF',
            height: '15px',
          }}
          variant='rectangular'
        />
      </Box>
      <Skeleton
        variant='rectangular'
        sx={{
          width: '100%',
          height: '33px',
          background: '#C8E1FC',
        }}
        animation={false}
      />
    </Box>
  </Stack>
);
export const CopyRightSkeleton = (
  <Stack
    sx={{
      marginTop: '16px',
      backgroundColor: '#F3FAFF',
      display: 'flex',
      justifyContent: 'flex-end',
      alignContent: 'center',
      width: '100%',
      height: '194px',
    }}
    spacing={1}
  >
    {/* For variant="text", adjust the height via font-size */}
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          border: '1px dashed #8CC8FA',
          borderRadius: '5px',
          padding: '5px',
          position: 'absolute',
          width: '90%',
          left: '5%',
          top: '5px',
        }}
      >
        <Skeleton
          sx={{
            backgroundColor: '#F3FAFF',
            height: '15px',
          }}
          variant='rectangular'
        ></Skeleton>
      </Box>
      <Skeleton
        variant='rectangular'
        sx={{
          width: '100%',
          height: '33px',
          background: '#C8E1FC',
        }}
        animation={false}
      />
    </Box>
  </Stack>
);

export const NewsLetterSkeleton = (
  <Stack
    sx={{
      marginTop: '16px',
      backgroundColor: '#F3FAFF',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
      height: '194px',
      padding: '20px',
    }}
    spacing={1}
  >
    {/* For variant="text", adjust the height via font-size */}
    <Box sx={{ width: '100%', border: '1px dashed #8CC8FA', padding: '5px' }}>
      <Skeleton
        variant='rectangular'
        sx={{
          background: '#C8E1FC',
          height: '13px',
          borderRadius: '5px',
          width: '100%',
        }}
      />

      <Box
        sx={{
          marginTop: '25px',
          padding: '5px',
          borderRadius: '5px',
        }}
      >
        <Skeleton
          variant='rectangular'
          sx={{
            width: '100%',
            height: '5px',
            background: '#C8E1FC',
          }}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            width: '50%',
            height: '5px',
            marginTop: '9px',
            background: '#C8E1FC',
          }}
        />
      </Box>
      <Box sx={{ marginTop: '35px' }}>
        <Skeleton
          variant='rectangular'
          sx={{
            width: '100%',
            height: '33px',
            background: '#C8E1FC',
          }}
        />
      </Box>
    </Box>
  </Stack>
);

export const MediaHandleSkeleton = (
  <Stack
    sx={{
      marginTop: '16px',
      backgroundColor: '#F3FAFF',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
      height: '194px',
      padding: '20px',
    }}
    spacing={1}
  >
    {/* For variant="text", adjust the height via font-size */}
    <Box>
      <Box
        sx={{
          padding: '5px',
          borderRadius: '5px',
        }}
      >
        <Skeleton
          variant='rectangular'
          sx={{
            width: '100%',
            height: '5px',
            background: '#C8E1FC',
          }}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            width: '100%',
            height: '5px',
            marginTop: '12px',
            background: '#C8E1FC',
          }}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            width: '100%',
            height: '5px',
            marginTop: '12px',
            background: '#C8E1FC',
          }}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            width: '50%',
            height: '5px',
            marginTop: '12px',
            background: '#C8E1FC',
          }}
        />
      </Box>
      <Box
        sx={{
          border: '1px dashed #8CC8FA',
          padding: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%',
          marginTop: '35px',
        }}
      >
        <Skeleton
          variant='rectangular'
          sx={{
            marginTop: '5px',
            background: '#C8E1FC',
            borderRadius: '5px',
          }}
          width={30}
          height={30}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            marginTop: '5px',
            background: '#C8E1FC',
            borderRadius: '5px',
            marginLeft: '8px',
          }}
          width={30}
          height={30}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            marginTop: '5px',
            background: '#C8E1FC',
            borderRadius: '5px',
            marginLeft: '8px',
          }}
          width={30}
          height={30}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            marginTop: '5px',
            background: '#C8E1FC',
            borderRadius: '5px',
            marginLeft: '8px',
          }}
          width={30}
          height={30}
        />
      </Box>
    </Box>
  </Stack>
);

export const HeaderLogoSkeleton = (pos) => (
  <>
    <Stack
      sx={{
        marginTop: '16px',
        backgroundColor: '#F3FAFF',
        display: 'flex',
        width: '100%',
        height: '72px',
        padding: '5px',
      }}
    >
      {/* For variant="text", adjust the height via font-size */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Skeleton
          variant='rectangular'
          sx={{
            marginTop: '5px',
            background: '#C8E1FC',
            border: pos === 1 ? '1px dashed #4B9EF9' : '0',
            borderRadius: '5px',
            marginRight: '12px',
          }}
          width={50}
          height={50}
          animation={pos === 1 ? 'wave' : false}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            flex: 1,
            height: '5px',
            background: '#C8E1FC',
          }}
          animation={pos === 2 ? 'wave' : false}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            flex: 1,
            height: '5px',
            marginLeft: '12px',
            background: '#C8E1FC',
          }}
          animation={pos === 2 ? 'wave' : false}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            flex: 1,
            height: '5px',
            marginLeft: '12px',
            background: '#C8E1FC',
          }}
          animation={pos === 2 ? 'wave' : false}
        />
      </Box>
    </Stack>
  </>
);
export const HeaderSearchSkeleton = (border) => (
  <>
    <Stack
      sx={{
        backgroundColor: '#F3FAFF',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '194px',
        padding: '5px',
        marginTop: '16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '31px',
          borderRadius: '5px',
          background: '#C8E1FC',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Skeleton
          variant='rectangular'
          sx={{
            width: '71px',
            height: '5px',
            background: '#E2F0FF',
            marginRight: '20px',
            display: 'flex',
            margin: '13px',
          }}
        ></Skeleton>
        <Box
          sx={{
            width: '1px',
            height: '19px',
            background: '#4B9EF9',
            margin: '5px',
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            margin: '7px 7px 7px 95px',
          }}
        >
          <img src={Searchheadericon} alt='Searchheadericon' />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '108px',
          padding: '13px 5px',
          borderRadius: '5px',
          background: '#E2F0FF',
          marginTop: '3px',
        }}
      >
        <Skeleton
          variant='rectangular'
          sx={{ width: '129px', height: '5px', background: '#C8E1FC' }}
          animation={border === 1 ? 'wave' : false}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            width: '70px',
            height: '5px',
            background: '#C8E1FC',
            marginTop: '12px',
          }}
          animation={border === 1 ? 'wave' : false}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            width: '116',
            height: '5px',
            background: '#C8E1FC',
            marginTop: '4px',
          }}
          animation={border === 1 ? 'wave' : false}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            width: '129px',
            height: '5px',
            background: '#C8E1FC',
            marginTop: '4px',
          }}
          animation={border === 1 ? 'wave' : false}
        />
        <Skeleton
          variant='rectangular'
          sx={{
            width: '94px',
            height: '5px',
            background: '#C8E1FC',
            marginTop: '4px',
          }}
          animation={border === 1 ? 'wave' : false}
        />
      </Box>
    </Stack>
  </>
);

export const HeaderFaviconSkeleton = (border) => (
  <>
    <Stack
      sx={{
        backgroundColor: '#F3FAFF',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '194px',
        padding: '5px',
        marginTop: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: '3px',
          padding: '5px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '71px',
            height: '26px',
            background: '#E2F0FF',
            borderRadius: '5px',
            marginRight: '5px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '15px',
              height: '15px',
              background: '#C8E1FC',
              marginTop: '6px',
              marginLeft: '4px',
              borderRadius: '3px',
            }}
          ></Box>
          <Skeleton
            variant='rectangular'
            sx={{
              width: '37px',
              height: '5px',
              background: '#C8E1FC',
              marginTop: '12px',
              marginLeft: '3px',
            }}
          ></Skeleton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '71px',
            height: '26px',
            background: '#C8E1FC',
            borderRadius: '5px',
            marginRight: '5px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '15px',
              height: '15px',
              background: '#4B9EF9',
              marginTop: '6px',
              marginLeft: '4px',
              borderRadius: '3px',
            }}
          ></Box>
          <Skeleton
            variant='rectangular'
            sx={{
              width: '37px',
              height: '5px',
              background: '#E2F0FF',
              marginTop: '12px',
              marginLeft: '4px',
            }}
          ></Skeleton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '71px',
            height: '26px',
            background: '#E2F0FF',
            borderRadius: '5px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '15px',
              height: '15px',
              background: '#C8E1FC',
              marginTop: '6px',
              marginLeft: '4px',
              borderRadius: '3px',
            }}
          ></Box>
          <Skeleton
            variant='rectangular'
            sx={{
              width: '37px',
              height: '5px',
              background: '#C8E1FC',
              marginTop: '12px',
              marginLeft: '2px',
            }}
          ></Skeleton>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '1px',
          marginTop: '-5px',
          background: '#C8E1FC',
        }}
      ></Box>
    </Stack>
  </>
);
export const HeaderLanguageSkeleton = (pos) => (
  <>
    <Stack
      sx={{
        backgroundColor: '#F3FAFF',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '182px',
        padding: '5px',
        marginTop: '16px',
        borderRadius: '5px',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: '7px',
          }}
        >
          <Skeleton
            variant='rectangular'
            sx={{
              width: '66px',
              height: '8px',
              background: '#C8E1FC',
              marginRight: '14px',
            }}
          ></Skeleton>
          <Skeleton
            variant='rectangular'
            sx={{
              width: '66px',
              height: '8px',
              background: '#C8E1FC',
              marginRight: '12px',
            }}
          ></Skeleton>
          <Box
            sx={{
              marginRight: '12px',
              marginTop: '-3px',
            }}
          >
            <img src={Searchheadericon} alt='Searchheadericon' />
          </Box>
          <Box
            sx={{
              display: 'flex',
              marginTop: '-3px',
            }}
          >
            <img src={Headerpublic} alt='Headerpublic' />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '1px',
            background: '#C8E1FC',
          }}
        ></Box>
        <Box
          sx={{
            width: '114px',
            height: '112px',
            background: '#E2F0FF',
            marginTop: '10px',
            padding: '5px',
            marginLeft: '40%',
          }}
        >
          <Skeleton
            variant='rectangular'
            sx={{
              width: '86px',
              height: '9px',
              background: '#C8E1FC',
              marginTop: '5px',
            }}
          ></Skeleton>
          <Skeleton
            variant='rectangular'
            sx={{
              width: '58px',
              height: '9px',
              background: '#C8E1FC',
              marginTop: '7px',
            }}
          ></Skeleton>
          <Skeleton
            variant='rectangular'
            sx={{
              width: '69px',
              height: '9px',
              background: '#C8E1FC',
              marginTop: '9px',
            }}
          ></Skeleton>
          <Skeleton
            variant='rectangular'
            sx={{
              width: '79px',
              height: '9px',
              background: '#C8E1FC',
              marginTop: '11px',
            }}
          ></Skeleton>
          <Skeleton
            variant='rectangular'
            sx={{
              width: '69px',
              height: '9px',
              background: '#C8E1FC',
              marginTop: '13px',
            }}
          ></Skeleton>
        </Box>
      </Box>
    </Stack>
  </>
);
export const HeaderCtaSkeleton = (border) => (
  <>
    <Stack
      sx={{
        marginTop: '16px',
        backgroundColor: '#F3FAFF',
        display: 'flex',
        //justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '60px',
        padding: '5px',
      }}
      spacing={1}
    >
      {/* For variant="text", adjust the height via font-size */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          // marginTop: '25px',
          // padding: '5px',
        }}
      >
        <Box
          sx={{
            width: '16px',
            height: '16px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginTop: '5px',
            marginRight: '12px',
            margin: '10px',
          }}
        >
          <img src={Ctasearch} alt='Ctasearch' />
        </Box>

        <Box
          sx={{
            width: '16px',
            height: '16px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginRight: '12px',
            margin: '9px',
          }}
        >
          <img src={Ctaround} alt='Ctaround' />
        </Box>

        {/* </Box> */}
        <Box
          sx={
            border === 1
              ? {
                  border: '1px dashed #8CC8FA',
                  padding: '3px',
                  width: '75%',
                  borderRadius: '5px',
                }
              : { width: '75%', padding: '0 3px' }
          }
        >
          <Box
            sx={{
              background: '#E2F0FF',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '5px',
            }}
          >
            <Skeleton
              variant='rectangular'
              sx={{
                width: '80%',
                height: '15px',
                background: '#C8E1FC',
                borderRadius: '5px',
              }}
              animation={border === 1 ? 'wave' : false}
            ></Skeleton>
          </Box>
        </Box>
      </Box>
    </Stack>
  </>
);
export const formConfig = [
  {
    name: 'cookie_title',
    type: 'textbox',
    maxLength: 50,
    title: 'enter_cookie_title',
    subTitle: 'cookie_title_goes_here',
    // placeHolder: 'enter_cookie_title_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: InformativeCookieSkeleton(1),
    skeletonTitle: 'title_will_be_updated_here',
  },
  {
    name: 'cookie_description',
    type: 'textarea',
    maxLength: 250,
    title: 'enter_cookie_description',
    subTitle: 'cookie_description_goes_here',
    // placeHolder: 'enter_cookie_description_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: InformativeCookieSkeleton(2),
    skeletonTitle: 'description_will_be_updated_here',
  },
  {
    name: 'cookie_button_text',
    type: 'textbox',
    maxLength: 50,
    title: 'cookie_button_text',
    subTitle: 'cookie_button_text_goes_here',
    // placeHolder: 'enter_cookie_button_text_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: InformativeCookieSkeleton(3),
    skeletonTitle: 'button_will_be_updated_here',
  },
  {
    name: 'informative_cookie_policy_link',
    type: 'textbox',
    maxLength: 50,
    title: 'informative_cookie_policy_link',
    subTitle: 'informative_cookie_policy_link_goes_here',
    // placeHolder: 'enter_cookie_button_text_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: null,
    skeletonTitle: 'button_will_be_updated_here',
  },
  {
    name: 'cookie_informative_expiry_time',
    type: 'textbox',
    maxLength: 50,
    title: 'cookie_informative_expiry_time',
    subTitle: 'cookie_informative_expiry_time_goes_here',
    placeHolder: 'enter_cookie_days_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: '',
    skeletonTitle: '',
  },
  {
    name: 'consent_cookie_title',
    type: 'textbox',
    maxLength: 50,
    title: 'enter_cookie_title',
    subTitle: 'cookie_title_goes_here',
    // placeHolder: 'enter_cookie_title_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: ConsetCookieSkeleton(1),
    skeletonTitle: 'title_will_be_updated_here',
  },
  {
    name: 'consent_cookie_description',
    type: 'textarea',
    maxLength: 250,
    title: 'enter_cookie_description',
    subTitle: 'cookie_description_goes_here',
    // placeHolder: 'enter_cookie_description_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: ConsetCookieSkeleton(2),
    skeletonTitle: 'description_will_be_updated_here',
  },
  {
    name: 'consent_cookie_button',
    type: 'textbox',
    maxLength: 16,
    title: 'cookie_accept_consent_cookie_button_text',
    subTitle: 'cookie_button_text_goes_here',
    // placeHolder: 'enter_accept_consent_cookie_button_text_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: ConsetCookieSkeleton(3),
    skeletonTitle: 'button_will_be_updated_here',
  },
  {
    name: 'manage_setting_cookie_button',
    type: 'textbox',
    maxLength: 16,
    title: 'cookie_manage_settings_cookie_button_text',
    subTitle: 'cookie_button_text_goes_here',
    // placeHolder: 'enter_manage_settings_cookie_button_text_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: ConsetCookieSkeleton(2),
    skeletonTitle: 'button_will_be_updated_here',
  },
  {
    name: 'cookie_manage_setting_title',
    type: 'textbox',
    maxLength: 50,
    title: 'cookie_manage_setting_title',
    subTitle: 'manage_setting_title_goes_here',
    // placeHolder: 'enter_manage_settings_title_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: ConsetCookieSkeleton(2),
    skeletonTitle: 'title_will_be_updated_here',
  },
  {
    name: 'manage_setting_description',
    type: 'textarea',
    maxLength: 250,
    title: 'manage_setting_description',
    subTitle: 'manage_setting_description_goes_here',
    // placeHolder: 'enter_manage_settings_description_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: ConsetCookieSkeleton(3),
    skeletonTitle: 'description_will_be_updated_here',
  },
  {
    name: 'cookie_manage_setting_consent_button',
    type: 'textbox',
    maxLength: 16,
    title: 'cookie_manage_setting_consent_button_text',
    subTitle: 'button_text_goes_here',
    // placeHolder: 'enter_manage_settings_accept_button_text_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: '',
  },
  {
    name: 'manage_save_setting_consent_button',
    type: 'textbox',
    maxLength: 16,
    title: 'manage_save_setting_consent_button_text',
    subTitle: 'button_text_goes_here',
    // placeHolder: 'enter_manage_settings_save_button_text_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: ConsetCookieSkeleton(2),
    skeletonTitle: 'button_will_be_updated_here',
  },
  {
    name: 'cookie_policy_cta_text',
    type: 'textbox',
    maxLength: 50,
    title: 'cookie_policy_CTA_text',
    subTitle: 'button_text_goes_here',
    // placeHolder: 'enter_cookie_policy_CTA_text_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: ConsetCookieSkeleton(2),
    skeletonTitle: 'button_will_be_updated_here',
  },
  {
    name: 'cookie_policy_cta_link',
    type: 'textbox',
    maxLength: 50,
    title: 'cookie_policy_CTA_link',
    subTitle: 'button_text_goes_here',
    // placeHolder: 'enter_cookie_policy_CTA_link_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: ConsetCookieSkeleton(2),
    skeletonTitle: 'button_will_be_updated_here',
  },
  {
    name: 'essential_cookie_title',
    type: 'textbox',
    maxLength: 50,
    title: 'essential_cookie_title',
    subTitle: 'cookie_title_goes_here',
    // placeHolder: 'enter_essential_cookie_title_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: '',
  },
  {
    name: 'essential_cookie_description',
    type: 'textarea',
    maxLength: 250,
    title: 'essential_cookie_description',
    subTitle: 'essential_cookie_description_goes_here',
    // placeHolder: 'enter_essential_cookie_description_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: nonAndessentialCookieSkeleton(1),
    skeletonTitle: 'essential_cookie_will_be_updated_here',
  },
  {
    name: 'non_essential_cookie_title',
    type: 'textbox',
    maxLength: 50,
    title: 'non_essential_cookie_title',
    subTitle: 'cookie_title_goes_here',
    placeHolder: 'enter_non_essential_cookie_title_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
  },
  {
    name: 'non_essential_cookie_description',
    type: 'textarea',
    maxLength: 250,
    title: 'non_essential_cookie_description',
    subTitle: 'non_essential_cookie_description_goes_here',
    // placeHolder: 'enter_non_essential_cookie_description_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: nonAndessentialCookieSkeleton(2),
    skeletonTitle: 'essential_cookie_will_be_updated_here',
  },
  {
    name: 'cookie_consent_expiry_time',
    type: 'textbox',
    maxLength: 50,
    title: 'cookie_consent_expiry_time',
    subTitle: 'cookie_consent_expiry_time_goes_here',
    placeHolder: 'enter_cookie_days_here',
    titleVarient: 'h6medium',
    subTitleVarient: 'h7regular',
    defaultValue: '',
    validations: [],
    skeleton: '',
    skeletonTitle: '',
  },
];
